let Utils = {
    DOM: {
        find: function(rootElem, sel) {
            return Utils.concat(rootElem.querySelectorAll(sel));
        },
        setData: function(domElem, key, value) {
            if (OOMLCompatDatasetExists) {
                domElem.dataset[key] = value;
            } else {
                domElem.setAttribute('data-' + Utils.toDashCase(key), value);
            }
        },
        // COMPATIBILITY: IE 9 doesn't create empty text node if the offset is equal to the length
        splitText: function(textNode, offset) {
            if (offset < textNode.data.length) {
                return textNode.splitText(offset);
            }

            let newTextNode = textNode.ownerDocument.createTextNode('');
            // WARNING: Useless empty text node must be returned, otherwise IE 9 breaks
            if (textNode.parentNode) {
                textNode.parentNode.appendChild(newTextNode);
            }
            return newTextNode;
        },
        hasAncestorNamespace: function(rootElem) {
            let toCheck = rootElem;
            while (toCheck) {
                if (toCheck[OOML_DOM_PROPNAME_ISNAMESPACE]) {
                    return true;
                }
                toCheck = toCheck.parentNode;
            }
            return false;
        },
    },
    parseTypeDeclaration: function(types) {
        return types.split('|').filter((type, idx, types) => {
            if (OOMLPropertyTypes.indexOf(type) == -1) {
                throw new SyntaxError(`Invalid type declaration "${ type }"`);
            }
            if (types.indexOf(type) !== idx) {
                throw new SyntaxError(`Duplicate type "${ type }" in type declaration`);
            }

            // There can only be one number type
            // If current type is a number type and there exists another number type...
            if (OOMLPropertyNumberTypes.indexOf(type) > -1 && types.some((t, i) => i != idx && OOMLPropertyNumberTypes.indexOf(t) > -1)) {
                throw new SyntaxError(`Illegal type declaration "${ type }"`);
            }
            return true;
        });
    },
    deepFreeze: function(obj) {
        Object.freeze(obj);
        Object.keys(obj).forEach(key => {
            let val = obj[key];
            if (Utils.isObjectLiteral(val)) {
                Utils.deepFreeze(val);
            }
        });
        return obj;
    },
    preprocessClassDeclaration: function(templateElem, strictPropertyNames) {
        let className, classIsAbstract, classExtends;
        for (let i = 0; i < templateElem.attributes.length; i++) {
            let attribute = templateElem.attributes[i];
            switch (attribute.name) {
                case 'ooml-class':
                case 'ooml-abstract-class':
                    if (className) {
                        throw new SyntaxError(`Duplicate class declaration attribute`);
                    }

                    let classDeclarationParts = /^([a-zA-Z]+)(?: extends ((?:[a-zA-Z]+\.)*(?:[a-zA-Z]+)))?$/.exec(attribute.value);
                    if (!classDeclarationParts) {
                        throw new SyntaxError(`Malformed attribute value for attribute "${ attribute.name }": "${ attribute.value }"`);
                    }

                    className = classDeclarationParts[1];
                    classIsAbstract = attribute.name.indexOf('abstract') > -1;
                    classExtends = classDeclarationParts[2] || undefined;
                    break;

                default:
                    throw new SyntaxError(`Unrecognised "${ attribute.name }" attribute on class declaration`);
            }
        }

        // Get all nodes in template to process
        let templateContent = OOMLCompatTemplateExists ?
            templateElem.content :
            templateElem;

        let classMetadata = {
            name: className,
            isAbstract: classIsAbstract,
            extends: classExtends,

            attributes: Utils.createCleanObject(),
            properties: Utils.createCleanObject(),
            methods: Utils.createCleanObject(),

            constructor: undefined,
            rootElem: undefined,
        };

        for (let i = 0; i < templateContent.childNodes.length; i++) {
            let node = templateContent.childNodes[i];

            if (node instanceof Comment) {
                continue;
            }
            if (node instanceof Text) {
                if (/\S/.test(node.data)) {
                    throw new SyntaxError(`Illegal text node in class declaration`);
                }
                continue;
            }
            if (!(node instanceof Element)) {
                throw new SyntaxError(`Illegal node in class declaration`);
            }

            if (classMetadata.rootElem) {
                throw new SyntaxError(`The class "${ classMetadata.name }" has more than one root element`);
            }

            switch (node.nodeName) {
                case 'OOML-ATTRIBUTE':

                    let attrName = node.getAttribute('name');
                    if (!Utils.isValidPropertyName(attrName)) {
                        throw new SyntaxError(`The attribute name "${ attrName }" is invalid`);
                    }

                    if (classMetadata.attributes[attrName]) {
                        throw new SyntaxError(`The attribute "${ attrName }" is already defined`);
                    }

                    let attrValue = Utils.getEvalValue(node.textContent);
                    /*
                    OVERRIDE: Attributes can contain any value
                    if (!Utils.isPrimitiveValue(attrValue)) {
                        throw new TypeError(`The value for the attribute "${ attrName }" is invalid`);
                    }
                    */

                    classMetadata.attributes[attrName] = {
                        value: attrValue,
                    };

                    break;

                case 'OOML-PROPERTY':

                    let propName = node.getAttribute('name');
                    let propTypes = node.getAttribute('type') || undefined;

                    if (!Utils.isValidPropertyName(propName, strictPropertyNames)) {
                        throw new SyntaxError(`The property name "${ propName }" is invalid`);
                    }

                    if (classMetadata.properties[propName] || classMetadata.methods[propName]) {
                        throw new SyntaxError(`A property or method called "${ propName }" already exists`);
                    }

                    if (propTypes) {
                        propTypes = Utils.parseTypeDeclaration(propTypes);
                    }

                    let propValue = Utils.getEvalValue(node.textContent);
                    if (!Utils.isPrimitiveValue(propValue)) {
                        throw new TypeError(`The value for the property "${ propName }" is invalid`);
                    }

                    classMetadata.properties[propName] = {
                        types: propTypes,
                        value: propValue,
                        isArray: false,
                    };

                    break;

                case 'OOML-METHOD':

                    let methodName = node.getAttribute('name');

                    if (methodName == 'constructor') {
                        if (classMetadata.constructor) {
                            throw new SyntaxError(`A constructor has already been defined for the class "${ classMetadata.name }"`);
                        }

                        classMetadata.constructor = Utils.getEvalValue(node.textContent.trim());
                        if (typeof classMetadata.constructor != 'function') {
                            throw new TypeError(`The constructor method for the class "${ classMetadata.name }" is not a function`);
                        }

                        if (classMetadata.constructor.length > 1) {
                            throw new SyntaxError(`The constructor method for the class "${ classMetadata.name }" has more than one argument`);
                        }

                        break;
                    }

                    if (!Utils.isValidPropertyName(methodName, strictPropertyNames)) {
                        throw new SyntaxError(`The method name "${ methodName }" is invalid`);
                    }

                    if (classMetadata.methods[methodName] || classMetadata.properties[methodName]) {
                        throw new SyntaxError(`A method or property called "${ methodName }" already exists`);
                    }

                    let methodMetadata = Utils.parseMethodFunction(node.textContent.trim(), methodName);

                    let argNames = [];
                    methodMetadata.args.forEach(function(arg) {
                        if (arg.destructure) {
                            if (arg.name) {
                                argNames.push(arg.name);
                            }
                            arg.properties.forEach(function(prop) {
                                argNames.push(prop.name);
                            });
                        } else {
                            argNames.push(arg.name);
                        }
                    });

                    let realFunc = Function.apply(undefined, Utils.concat(argNames, ['self', 'parent', `"use strict"; ${ methodMetadata.body }`]));

                    let wrapperFunc = function self() {
                        // See https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
                        // If arguments is length 1, manually construct, as Array constructor will interpret as length, not value
                        let providedArguments = arguments.length == 1 ? [arguments[0]] : Array.apply(undefined, arguments);
                        let providedArgument;

                        // WARNING: Won't clone nested objects and arrays, so don't mutate those
                        let definedArguments = methodMetadata.args.slice();
                        let arg;
                        let argIdx = -1;

                        let providedArgumentsUsedCount = 0;
                        let lftArgVals = [];
                        let rgtArgVals = [];

                        let processingDirectionLtr = true;
                        let collectArg;
                        let collectArgIdx;

                        while (arg = definedArguments[processingDirectionLtr ? 'shift' : 'pop']()) {

                            argIdx += processingDirectionLtr ? 1 : -1;

                            if (arg.collect) {
                                collectArg = arg;
                                collectArgIdx = argIdx;
                                argIdx = 0;
                                processingDirectionLtr = false;
                                continue;
                            }

                            let argumentProvided = providedArguments.hasOwnProperty(processingDirectionLtr ? 0 : (providedArguments.length - 1));
                            providedArgument = providedArguments[processingDirectionLtr ? 'shift' : 'pop']();
                            let pushTo = processingDirectionLtr ? lftArgVals : rgtArgVals;

                            let providedArgumentIsOmittedDestructure = false;

                            if (providedArgument === undefined) {
                                if (!arg.optional) {
                                    throw new TypeError('Argument ' + argIdx + ' must be provided');
                                }

                                // This will be undefined if there is no default value
                                providedArgument = typeof arg.defaultValue == 'function' ? arg.defaultValue() : arg.defaultValue;

                                if (!argumentProvided) {
                                    // The only way an element in providedArguments isn't defined
                                    // is if not all expected arguments are provided; therefore,
                                    // these not defined (NOT set to undefined) elements will be
                                    // at the end of the array.
                                    providedArgumentsUsedCount--;
                                }

                                if (arg.destructure) {
                                    providedArgumentIsOmittedDestructure = true;
                                }
                            } else if (arg.type && !Utils.isType(arg.type, providedArgument)) {
                                throw new TypeError('Argument ' + argIdx + ' should be of type ' + arg.type);
                            }

                            if (arg.destructure) {
                                if (arg.name) {
                                    pushTo.push(providedArgument);
                                }
                                arg.properties.forEach(function (prop, propIdx) {
                                    let propKey;
                                    let providedProperty;

                                    if (providedArgumentIsOmittedDestructure) {
                                        // If destructuring argument is optional and was not provided,
                                        // then all containing properties are also optional
                                        providedProperty = undefined;
                                    } else if (arg.type == 'object') {
                                        providedProperty = providedArgument[prop.name];
                                        propKey = prop.name;
                                    } else { // arg.type is 'array' or 'Array' or 'OOML.Array'
                                        propKey = propIdx;
                                        // NOTE: Don't need to check if type matches defined array type,
                                        // as previous Utils.isType call already did
                                        if (providedArgument instanceof OOML.Array) {
                                            providedProperty = providedArgument.get(propIdx);
                                        } else if (Utils.isArrayLike(providedArgument)) {
                                            providedProperty = providedArgument[propIdx];
                                        } else {
                                            throw new TypeError('Unrecognised array argument provided')
                                        }
                                    }

                                    if (providedProperty === undefined) {
                                        // All containing properties are optional
                                        // if the destructuring argument is optional
                                        // regardless of invididual property settings
                                        if (!providedArgumentIsOmittedDestructure && !prop.optional) {
                                            throw new TypeError('Property `' + propKey + '` in the ' + arg.type + ' provided as argument ' + argIdx + ' must be provided');
                                        }
                                        // This will be undefined if there is no default value
                                        providedProperty = typeof prop.defaultValue == 'function' ? prop.defaultValue() : prop.defaultValue;
                                    } else if (prop.type && !Utils.isType(prop.type, providedProperty)) {
                                        throw new TypeError('Property `' + propKey + '` in the ' + arg.type + ' provided as argument ' + argIdx + ' should be of type ' + prop.type);
                                    }

                                    pushTo.push(providedProperty);
                                });
                            } else {
                                pushTo.push(providedArgument);
                            }
                            providedArgumentsUsedCount++;
                        }

                        if (collectArg) {
                            let collectedVals = [];
                            providedArguments.forEach(function(providedArgument, offset) {
                                let argIdx = collectArgIdx + offset;

                                if (collectArg.type && !Utils.isType(collectArg.type, providedArgument)) {
                                    throw new TypeError('Argument ' + argIdx + ' should be of type ' + collectArg.type);
                                }

                                providedArgumentsUsedCount++;

                                collectedVals.push(providedArgument);
                            });
                            if (!collectedVals.length && !collectArg.optional) {
                                throw new TypeError('No arguments were provided to a collecting argument');
                            }
                            lftArgVals.push(collectedVals);
                        }

                        if (providedArgumentsUsedCount !== arguments.length) { // Don't use providedArguments as that has been mutated
                            throw new TypeError('Too many arguments provided');
                        }

                        let parentMethod = Object.getPrototypeOf(Object.getPrototypeOf(this))[methodName];
                        parentMethod = parentMethod ? parentMethod.bind(this) : undefined;

                        let argVals = Utils.concat(lftArgVals, rgtArgVals.reverse(), [
                            self.bind(this), parentMethod
                        ]);
                        return realFunc.apply(this, argVals);
                    };

                    classMetadata.methods[methodName] = {
                        fn: wrapperFunc,
                    };

                    break;

                default:
                    classMetadata.rootElem = node;
            }
        }

        if (!classMetadata.rootElem && !classMetadata.isAbstract) {
            throw new SyntaxError(`The class "${ classMetadata.name }" does not have a root element`);
        }

        if (classMetadata.rootElem && classMetadata.isAbstract) {
            throw new SyntaxError(`The abstract class "${ classMetadata.name }" has a root element`);
        }

        if (templateElem.parentNode) {
            templateElem.parentNode.removeChild(templateElem);
        }

        return classMetadata;
    },
    parseMethodFunction: function(funcdef, methodName) {
        let regexpMatches = /^function *([a-zA-Z_][a-zA-Z0-9_]+)?\s*\(/.exec(funcdef);
        if (!regexpMatches) {
            throw new SyntaxError('Invalid function declaration for method `' + methodName + '`');
        }

        let funcName = regexpMatches[1];
        if (funcName) {
            throw new SyntaxError('Function names are not supported for method functions; call the `self` function in the body to do recursion');
        }

        let toProcess = funcdef.slice(regexpMatches[0].length).trim();
        let destructuringMode = false;
        let effectiveArgNames = new StringSet();
        let args = [];
        let collectArgsCount = 0;

        while (true) {
            if (toProcess[0] == ',') {
                if (!args.length) {
                    throw new SyntaxError('Unexpected comma');
                }
                toProcess = toProcess.slice(1).trim();
            } else { // No comma
                if (toProcess[0] == ')') {
                    if (destructuringMode) {
                        throw new SyntaxError('Unexpected end of function destructuring argument declaration');
                    }
                    toProcess = toProcess.slice(1).trim();
                    break;
                } else if (toProcess[0] == '}') {
                    if (!destructuringMode) {
                        throw new SyntaxError('Unexpected closing brace');
                    }
                    destructuringMode = false;
                    toProcess = toProcess.slice(1).trim();
                    continue;
                } else if (destructuringMode ? args[args.length - 1].properties.length : args.length) {
                    throw new SyntaxError('Expected comma or closing bracket');
                }
            }

            let temp;
            if (temp = /^(\?)?([{[])/.exec(toProcess)) {
                if (destructuringMode) {
                    throw new SyntaxError('Nested destructuring is not allowed');
                }
                destructuringMode = true;
                let isOptional = temp[1] == '?';
                args.push({
                    destructure: true,
                    type: temp[2] == '{' ? 'object' : 'array',
                    name: undefined,
                    optional: isOptional,
                    properties: [],
                });
                toProcess = toProcess.slice(1 + isOptional).trim();
                continue;
            }

            let argmatches = /^([a-zA-Z.]+ )?(\?)?(\.\.\.)?([a-z_][a-zA-Z0-9_]*)( ?= ?)?( ?[\{\[]\s*)?/.exec(toProcess);
            if (!argmatches) {
                throw new SyntaxError('Unrecognised function argument declaration');
            }
            argmatches = argmatches.map(function(val) {
                let trimmed = val ? val.trim() : null;
                return trimmed || null; // In case string was originally only whitespace
            });
            toProcess = toProcess.slice(argmatches[0].length).trim();

            let matchedType = argmatches[1] || undefined;
            let matchedOptionalOperator = argmatches[2];
            let matchedCollectOperator = argmatches[3];
            let matchedArgname = argmatches[4];
            let matchedEqualsSign = argmatches[5];
            let matchedOpenBrace = argmatches[6];

            if (effectiveArgNames.has(matchedArgname)) {
                throw new SyntaxError('Argument name `' + matchedArgname + '` has already been used');
            }

            if (OOMLReservedFnArgNames.indexOf(matchedArgname) > -1) {
                throw new SyntaxError('Argument name `' + matchedArgname + '` is a reserved keyword');
            }

            if (matchedType && OOMLFnArgTypes.indexOf(matchedType) == -1) {
                throw new SyntaxError('Unrecognised argument type `' + matchedType + '`');
            }

            if (matchedOpenBrace && !matchedEqualsSign) {
                if (destructuringMode) {
                    throw new SyntaxError('Nested destructuring is not allowed');
                }
                if (matchedType) {
                    if ((matchedOpenBrace == '{' && matchedType != 'object') ||
                        (matchedOpenBrace == '[' && ['array', 'OOML.Array', 'Array'].indexOf(matchedType) == -1)
                    ) {
                        throw new SyntaxError('Destructuring argument type provided is not recognised');
                    }
                } else {
                    matchedType = matchedOpenBrace == '{' ? 'object' : 'array';
                }
                if (matchedCollectOperator) {
                    throw new SyntaxError('Destructuring argument contains invalid operator');
                }

                destructuringMode = true;
                args.push({
                    destructure: true,
                    type: matchedType,
                    name: matchedArgname,
                    optional: !!matchedOptionalOperator,
                    properties: [],
                });
                continue;
            }

            if (matchedEqualsSign && (matchedCollectOperator || matchedOptionalOperator)) {
                throw new SyntaxError('Argument with a default value has an operator');
            }
            if (matchedEqualsSign && ['function', 'OOML.Element'].indexOf(matchedType) > -1) {
                throw new SyntaxError('An argument with type ' + matchedType + ' cannot have a default argument');
            }
            if (destructuringMode && matchedCollectOperator) {
                throw new SyntaxError('The collect operator cannot be used inside a destructuring argument');
            }
            if (matchedCollectOperator) {
                collectArgsCount++;
                if (collectArgsCount > 1) {
                    throw new SyntaxError('A method cannot have more than one collecting argument');
                }
            }

            let defaultValue = undefined;
            if (matchedEqualsSign) {
                let booleanMatch;
                let dateConstructorMatch;
                let digitsMatch;

                if (/^null/.test(toProcess)) {
                    toProcess = toProcess.slice(4);
                    defaultValue = null;
                } else if (matchedType == 'null') {
                    throw new SyntaxError('A null argument has an invalid default value');
                }

                else if (matchedOpenBrace == '{' && toProcess[0] == '}') {
                    toProcess = toProcess.slice(1);
                    defaultValue = Utils.createCleanObject;
                } else if (matchedType == 'object') {
                    throw new SyntaxError('An object argument has an invalid default value');
                }

                else if (matchedOpenBrace == '[' && toProcess[0] == ']') {
                    toProcess = toProcess.slice(1);
                    // Need to bind as matchedType is not scoped and will mutate
                    defaultValue = function (type) {
                        return type == 'OOML.Array' ? new OOML.Array : []
                    }.bind(matchedType);
                } else if (['array', 'Array', 'OOML.Array'].indexOf(matchedType) > -1) {
                    throw new SyntaxError('An array argument has an invalid default value');
                }

                else if (booleanMatch = /^(true|false)/.exec(toProcess)) {
                    toProcess = toProcess.slice(booleanMatch[0].length);
                    defaultValue = booleanMatch[0] == 'true';
                } else if (matchedType == 'boolean') {
                    throw new SyntaxError('A boolean argument has an invalid default value');
                }

                else if (dateConstructorMatch = /^new Date\(\s*((?:[0-9]+,\s*)*(?:[0-9]+)?)\s*\)/.exec(toProcess)) {
                    toProcess = toProcess.slice(dateConstructorMatch[0].length);
                    defaultValue = Function('return ' + dateConstructorMatch);
                } else if (matchedType == 'Date') {
                    throw new SyntaxError('A Date argument has an invalid default value');
                }

                else if (toProcess[0] == '"' || toProcess[0] == "'") {
                    let parseFlagStringEscape = false;
                    let parseFlagStringEndChar = toProcess[0];
                    let ended = false;
                    toProcess = toProcess.slice(1);
                    defaultValue = '';
                    while (!ended) {
                        if (!toProcess.length) {
                            throw new SyntaxError('Unexpected end of input');
                        }
                        switch (toProcess[0]) {
                            case parseFlagStringEndChar:
                                if (parseFlagStringEscape) {
                                    defaultValue += toProcess[0];
                                    parseFlagStringEscape = false;
                                } else {
                                    ended = true;
                                }
                                break;

                            case '\\':
                                if (parseFlagStringEscape) {
                                    defaultValue += '\\';
                                }
                                parseFlagStringEscape = !parseFlagStringEscape;
                                break;

                            case '\n':
                                if (parseFlagStringEscape) {
                                    parseFlagStringEscape = false;
                                } else {
                                    throw new SyntaxError("A string argument has an invalid default value");
                                }
                                break;

                            default:
                                if (parseFlagStringEscape) {
                                    let escapeMatches = /^(u([a-fA-F0-9]{4}|\{[a-fA-F0-9]+\})|x[a-fA-F0-9]{2})/.exec(toProcess);
                                    if (escapeMatches) {
                                        defaultValue += eval('"\\' + escapeMatches[0] + '"');
                                        toProcess = toProcess.slice(escapeMatches[0].length - 1); // Leave last character to be sliced by outer .slice call
                                    } else {
                                        defaultValue += eval('"\\' + toProcess[0] + '"');
                                    }
                                    parseFlagStringEscape = false;
                                } else {
                                    defaultValue += toProcess[0];
                                }
                        }
                        toProcess = toProcess.slice(1);
                    }
                } else if (matchedType == 'string') {
                    throw new SyntaxError('A string argument has an invalid default value');
                }

                else if (digitsMatch = /^(?:0b[01]+|0o[0-7]+|0x[0-9a-f]+|[0-9]*\.?[0-9]+(?:e[0-9]+)?)/i.exec(toProcess)) {
                    toProcess = toProcess.slice(digitsMatch[0].length);
                    defaultValue = Number(digitsMatch[0]);
                    if (!Utils.isType(matchedType, defaultValue)) { // Will check for NaN if necessary
                        throw new SyntaxError('A number argument has an invalid default value');
                    }
                } else if (['number', 'natural', 'integer', 'float'].indexOf(matchedType) > -1) {
                    throw new SyntaxError('A number argument has an invalid default value');
                } else {
                    throw new SyntaxError('Unrecognised default value');
                }
            }

            let pushTo = destructuringMode ? args[args.length - 1].properties : args;
            pushTo.push({
                type: matchedType,
                name: matchedArgname,
                optional: !!matchedOptionalOperator || defaultValue !== undefined,
                collect: !!matchedCollectOperator,
                defaultValue: defaultValue,
            });

            toProcess = toProcess.trim();
        }

        if (toProcess[0] != '{' || toProcess[toProcess.length - 1] != '}') {
            throw new SyntaxError('Function body braces are missing');
        }

        let funcBody = toProcess.slice(1, -1).trim();

        return {
            args: args,
            body: funcBody,
        };
    },
    isValidAttributeName: function(name) {
        return /^[a-z]+([A-Z][a-z]*)*$/.test(name);
    },
    isValidPropertyName: function(name, strictMode) {
        return typeof name == 'string' &&
            !!name.length &&
            name[0] != '$' &&
            // Double underscore prefix
            !(name[0] == '_' && name[1] == '_') &&
            // Starting or trailing whitespace
            !/^\s|\s$/.test(name) &&
            OOMLReservedPropertyNames.indexOf(name) == -1 &&
            (!strictMode || /^[a-z][a-zA-Z0-9_]*$/.test(name))
        ;
    },
    toDashCase: function(str) {
        return str.replace(/^[a-z]+|(?!^)(?:[A-Z][a-z]*)/g, function(match) {
            return match.toLowerCase() + '-';
        }).slice(0, -1);
    },
    getEvalValue: function(codeStr) {
        codeStr = codeStr.trim() || undefined;
        return Function('return ' + codeStr)();
    },
    clone: function(obj) {
        let cloned;
        if (Utils.isObjectLiteral(obj)) {
            cloned = Utils.createCleanObject();
            Object.keys(obj).forEach(key => {
                cloned[key] = Utils.clone(obj[key]);
            });
        } else if (Array.isArray(obj)) {
            cloned = obj.map(item => Utils.clone(item));
        } else {
            cloned = obj;
        }
        return cloned;
    },
    concat: function() {
        let ret;

        if (Utils.isObjectLiteral(arguments[0])) {
            ret = Utils.createCleanObject();
            for (let i = 0; i < arguments.length; i++) {
                let obj = arguments[i];
                if (Utils.isObjectLiteral(obj)) {
                    Object.keys(obj).forEach(function(prop) {
                        ret[prop] = obj[prop];
                    });
                }
            }
        } else {
            // WARNING: Don't use .concat as that doesn't work with array-like objects
            // e.g. [].concat(NodeList(div, span)) becomes [NodeList], not [div, span]
            ret = Array.prototype.slice.call(arguments[0]);
            for (let i = 1; i < arguments.length; i++) {
                if (arguments[i] && arguments[i].length) {
                    Array.prototype.push.apply(ret, arguments[i]);
                }
            }
        }
        return ret;
    },
    pushAll: function() {
        let arr = arguments[0];
        for (let i = 1; i < arguments.length; i++) {
            Array.prototype.push.apply(arr, arguments[i]);
        }
    },
    // Function that matches host array-like objects as well as primitive Array instances
    // Should not match external library array-like objects (e.g. jQuery or OOML.Array)
    isArrayLike: function(obj) {
        if (!obj) {
            return false;
        }

        // A "real" array fails most of the other tests, so short-circuit here
        if (Array.isArray(obj)) {
            return true;
        }

        if (typeof obj != 'object' || !(obj instanceof Object)) {
            return false;
        }

        let length = obj.length;
        if (!Utils.isType('natural', length)) {
            return false;
        }

        if (obj.hasOwnProperty('length')) {
            return false;
        }

        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), 'length');
        if (!descriptor || !descriptor.get || descriptor.set) {
            return false;
        }

        return true;
    },
    isOOMLClass: function(c) {
        return c.prototype instanceof OOML.Element;
    },
    isPrimitiveValue: function(val) {
        return OOMLPrimitiveTypes.some(type => Utils.isType(type, val));
    },
    isObjectLiteral: function(obj) {
        // typeof null == 'object'
        // Use typeof as .getPrototypeOf can't be used with non-objects
        // Object.create(null) is NOT instanceof Object, so don't use instanceof
        return !!obj && typeof obj == 'object' && (obj.constructor == Object || Object.getPrototypeOf(obj) === null);
    },
    isType: function(type, value) {
        switch (type) {
            case 'Date':
                return value instanceof Date;

            case 'null':
                return value === null;

            case 'Array':
                return Array.isArray(value);

            case 'number':
            case 'boolean':
            case 'string':
            case 'function':
                return typeof value == type;

            case 'natural':
            case 'integer':
                return typeof value == 'number' &&
                    isFinite(value) &&
                    Math.floor(value) === value &&
                    (type != 'natural' || value >= 0);

            case 'float':
                // Floats can have zero remainder, as there is no real difference between int and float in JS
                return typeof value == 'number' &&
                    isFinite(value); // Returns false on NaN and +/-Infinity

            case 'object':
                return Utils.isObjectLiteral(value);

            case 'array':
                return Utils.isArrayLike(value) || value instanceof OOML.Array;

            case 'OOML.Array':
                return value instanceof OOML.Array;

            case 'OOML.Element':
                return value instanceof OOML.Element;

            default:
                throw new Error('Unrecognised type for checking against');
        }
    },
    createCleanObject: function() {
        return Object.create(null);
    },
    constructElement: function(elemConstructor, obj) {
        if (obj instanceof elemConstructor) {
            return obj;
        } else if (elemConstructor == OOML.Element || elemConstructor == HTMLElement) {
            throw new SyntaxError('Unable to construct new instance; the type is an abstract class');
        } else if (!Utils.isObjectLiteral(obj)) {
            throw new TypeError('Unable to construct new instance; the provided object is not of the correct type');
        }

        return new elemConstructor(obj);
    },
    splitStringByParamholders: function(str) {
        let strParts = [],
            paramMap = Utils.createCleanObject();

        while (true) {
            let posOfOpeningBraces = str.indexOf('{{');

            if (posOfOpeningBraces < 0) {
                if (str) {
                    strParts.push(str);
                }
                break;
            }

            let strBeforeParam = str.slice(0, posOfOpeningBraces);
            if (strBeforeParam) strParts.push(strBeforeParam);
            str = str.slice(posOfOpeningBraces + 2);

            let posOfClosingBraces = str.indexOf('}}');
            if (posOfClosingBraces < 0) {
                throw new SyntaxError('Unexpected end of input; expected closing text parameter braces');
            }

            let param = str.slice(0, posOfClosingBraces);
            let regexpMatches;

            if (!(regexpMatches = /^ this\.(attributes\.)?(.+) $/.exec(param))) {
                throw new SyntaxError(`Invalid property declaration in attribute value at "${ param }"`);
            }

            param = param[2];
            let paramIsAttribute = !!regexpMatches[1];

            if (paramIsAttribute) {
                // TODO
            }

            if (!Utils.isValidPropertyName(param)) {
                throw new SyntaxError(`"${ param }" is not a valid property name`);
            }

            if (!paramMap[param]) {
                paramMap[param] = [];
            }
            paramMap[param].push(strParts.length);
            strParts.push('');

            str = str.slice(posOfClosingBraces + 2);
        }

        return {
            parts: strParts,
            map: paramMap,
        };
    },
};
