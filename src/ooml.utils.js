let Utils = {
    DOM: {
        find: (rootElem, sel) => Utils.concat(rootElem.querySelectorAll(sel)),

        setData: (domElem, key, value) => {
            if (OOMLCompatDatasetExists) {
                domElem.dataset[key] = value;
            } else {
                domElem.setAttribute('data-' + Utils.toDashCase(key), value);
            }
        },

        hasAncestorOrDescendantNamespace: rootElem => {
            let toCheck, current;

            toCheck = rootElem;
            while (toCheck) {
                if (toCheck[OOML_DOM_PROPNAME_ISNAMESPACE]) {
                    return true;
                }
                toCheck = toCheck.parentNode;
            }

            toCheck = [rootElem];
            while (current = toCheck.shift()) {
                if (current[OOML_DOM_PROPNAME_ISNAMESPACE]) {
                    return true;
                }
                toCheck.push(current.children);
            }

            return false;
        },

        writeValue: (type, name, nodes, value, customHtml) => {
            let customDom;
            let useCustomHtml = Utils.typeOf(customHtml, TYPEOF_STRING);

            // customHtml may be empty, which means that custom HTML is still wanted (i.e. don't write text value), but remove any current custom HTML
            if (useCustomHtml) {
                let dom = document.createElement('div');
                dom.innerHTML = customHtml.trim();
                if (dom.children.length > 1) {
                    throw new SyntaxError(`Custom HTML has more than one root element`);
                }
                customDom = dom.children[0];
            }

            nodes.forEach(node => {
                if (node instanceof Text) {
                    if (useCustomHtml) {

                        if (node.nextSibling && node.nextSibling[OOML_DOM_PROPNAME_ISCUSTOMHTML]) {
                            delete node.nextSibling[OOML_DOM_PROPNAME_ISCUSTOMHTML];
                            node.parentNode.removeChild(node.nextSibling);
                        }

                        if (customDom) {
                            let customDomDuplicated = customDom.cloneNode(true);
                            customDomDuplicated[OOML_DOM_PROPNAME_ISCUSTOMHTML] = true;

                            node.parentNode.insertBefore(customDomDuplicated, node.nextSibling);
                        }

                        node.data = '';

                    } else {

                        node.data = value;

                    }
                } else { // Must be attribute
                    let formatStr = node.valueFormat;

                    let setToUse;
                    if (type == 'attribute') {
                        setToUse = node.valueFormatMap.attributes[name];
                    } else {
                        setToUse = node.valueFormatMap[name];
                    }
                    setToUse.forEach(offset => {
                        formatStr[offset] = value;
                    });
                    OOMLNodesWithUnwrittenChanges.add(node);
                }
            });

            OOMLWriteChanges();
        },
    },

    typeOf: (value, type) => {
        return typeof value == type;
    },

    iterate: (iterable, iterator) => {
        for (let i = 0; i < iterable.length; i++) {
            iterator(iterable[i], i, iterable);
        }
    },

    hasOwnProperty: (obj, propName) => Object.prototype.hasOwnProperty.call(obj, propName),

    parseTypeDeclaration: types => types.split('|').filter((type, idx, types) => {
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
    }),

    deepFreeze: obj => {
        Object.freeze(obj);
        Object.keys(obj).forEach(key => {
            let val = obj[key];
            if (Utils.isObjectLiteral(val) || Array.isArray(val)) {
                Utils.deepFreeze(val);
            }
        });
        return obj;
    },

    isEmptyString: str => !Utils.typeOf(str, TYPEOF_STRING) || !str.trim(),

    preprocessClassDeclaration: (templateElem, strictPropertyNames) => {
        let className, classIsAbstract, classExtends;
        // ooml-(abstract)?-class definitely exists as this function is only called via querySelectorAll
        Utils.iterate(templateElem.attributes, attribute => {
            switch (attribute.name) {
                case 'ooml-class':
                case 'ooml-abstract-class':
                    if (className) {
                        throw new ReferenceError(`Duplicate class declaration attribute`);
                    }

                    // Class may extend class name with dot (.) as imported classes' names may have dot
                    let classDeclarationParts = /^([a-zA-Z]+)(?: extends ((?:[a-zA-Z]+\.)*(?:[a-zA-Z]+)))?$/.exec(attribute.value);
                    if (!classDeclarationParts) {
                        throw new SyntaxError(`Malformed attribute value for attribute "${ attribute.name }": "${ attribute.value }"`);
                    }

                    className = classDeclarationParts[1];
                    classIsAbstract = attribute.name.indexOf('abstract') > -1;
                    classExtends = classDeclarationParts[2] || undefined;
                    break;

                default:
                    throw new ReferenceError(`Unrecognised "${ attribute.name }" attribute on class declaration`);
            }
        });

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

        Utils.iterate(templateContent.childNodes, node => {

            if (node instanceof Comment) {
                return;
            }

            if (node instanceof Text) {
                if (/\S/.test(node.data)) {
                    throw new TypeError(`Illegal text node in class declaration`);
                }
                return;
            }

            if (!(node instanceof Element)) {
                throw new TypeError(`Illegal node in class declaration`);
            }

            if (classMetadata.rootElem) {
                throw new SyntaxError(`The class "${ classMetadata.name }" has more than one root element`);
            }

            switch (node.nodeName) {
                case 'OOML-ATTRIBUTE':

                    let attrName;
                    let attrTypes;

                    Utils.iterate(node.attributes, attr => {
                        // DOM attribute, not OOML attribute!!
                        let _attrName = attr.name;
                        let _attrVal = attr.value;

                        switch (_attrName) {
                            case 'name':
                                attrName = _attrVal;
                                break;

                            case 'type':
                                if (Utils.isEmptyString(_attrVal)) {
                                    throw new SyntaxError(`Invalid type declaration for attribute declared by ooml-attribute tag`);
                                }
                                attrTypes = _attrVal;
                                break;

                            default:
                                throw new ReferenceError(`Unrecognised attribute "${ _attrName }" on ooml-attribute tag`);
                        }
                    });

                    if (!Utils.isValidAttributeName(attrName)) {
                        throw new SyntaxError(`The attribute name "${ attrName }" is invalid`);
                    }

                    if (classMetadata.attributes[attrName]) {
                        throw new ReferenceError(`The attribute "${ attrName }" is already defined`);
                    }

                    if (attrTypes) {
                        attrTypes = Utils.parseTypeDeclaration(attrTypes);
                    }

                    let attrValue = Utils.getEvalValue(node.textContent);
                    if (attrValue === undefined || (attrTypes && !Utils.isType(attrTypes, attrValue))) {
                        throw new TypeError(`The value for the attribute "${ attrName }" is invalid`);
                    }

                    classMetadata.attributes[attrName] = {
                        types: attrTypes,
                        value: attrValue,
                    };

                    break;

                case 'OOML-PROPERTY':

                    let propName;
                    let propTypes;
                    let isSuppressed = false;

                    let propGetter, propSetter;

                    Utils.iterate(node.attributes, attr => {
                        let _attrName = attr.name;
                        let _attrVal = attr.value;

                        switch (_attrName) {
                            case 'name':
                                propName = _attrVal;
                                break;

                            case 'type':
                                if (Utils.isEmptyString(_attrVal)) {
                                    throw new SyntaxError(`Invalid type declaration for attribute declared by ooml-property tag`);
                                }
                                propTypes = _attrVal;
                                break;

                            case 'suppressed':
                                /* Valid _attrVal values could be (depending on browser intrepretation):
                                 * - Boolean true or false
                                 * - String "true" or "false"
                                 * - Empty string or null
                                 *
                                 * Therefore _attrValStr could be "", "true", "false" or "null"
                                 */
                                let _attrValStr = '' + _attrVal;

                                if (_attrVal && _attrValStr != 'true' && _attrValStr != 'false') {
                                    throw new SyntaxError(`Invalid suppressed value for attribute declared by ooml-property tag`);
                                }
                                isSuppressed = _attrValStr != 'false';
                                break;

                            case 'get':
                                if (Utils.isEmptyString(_attrVal)) {
                                    throw new SyntaxError(`Invalid ${ _attrName } function`);
                                }

                                propGetter = Function('classes', 'property', 'currentValue', _attrVal.trim());
                                break;

                            case 'set':
                                if (Utils.isEmptyString(_attrVal)) {
                                    throw new SyntaxError(`Invalid ${ _attrName } function`);
                                }

                                propSetter = Function('classes', 'property', 'currentValue', 'newValue', _attrVal.trim());
                                break;

                            default:
                                throw new ReferenceError(`Unrecognised attribute "${ _attrName }" on ooml-property tag`);
                        }
                    });

                    if (!Utils.isValidPropertyName(propName, strictPropertyNames)) {
                        throw new SyntaxError(`The property name "${ propName }" is invalid`);
                    }

                    if (classMetadata.properties[propName] || classMetadata.methods[propName]) {
                        throw new ReferenceError(`A property or method called "${ propName }" already exists`);
                    }

                    if (propTypes) {
                        propTypes = Utils.parseTypeDeclaration(propTypes);
                    }

                    let propValue = Utils.getEvalValue(node.textContent);
                    if (!Utils.isPrimitiveValue(propValue) || (propTypes && !Utils.isType(propTypes, propValue))) {
                        throw new TypeError(`The value for the property "${ propName }" is invalid`);
                    }

                    classMetadata.properties[propName] = {
                        types: propTypes,
                        value: propValue,
                        isArray: false,
                        getter: propGetter,
                        setter: propSetter,
                        suppressed: isSuppressed,
                    };

                    break;

                case 'OOML-METHOD':

                    let methodName;

                    Utils.iterate(node.attributes, attr => {
                        let attrVal = attr.value;
                        switch (attr.name) {
                            case 'name':
                                methodName = attrVal;
                                break;

                            default:
                                throw new ReferenceError(`Unrecognised attribute "${ attr.name }" on ooml-method tag`);
                        }
                    });

                    // Abstract methods can also have constructors, as descendant classes can call it
                    if (methodName == 'constructor') {
                        if (classMetadata.constructor) {
                            throw new ReferenceError(`A constructor has already been defined for the class "${ classMetadata.name }"`);
                        }

                        classMetadata.constructor = Utils.getEvalValue(node.textContent.trim());
                        if (!Utils.typeOf(classMetadata.constructor, TYPEOF_FUNCTION)) {
                            throw new TypeError(`The constructor method for the class "${ classMetadata.name }" is not a function`);
                        }

                        if (classMetadata.constructor.length > 1) {
                            throw new TypeError(`The constructor method for the class "${ classMetadata.name }" has more than one argument`);
                        }

                        break;
                    }

                    if (!Utils.isValidPropertyName(methodName, strictPropertyNames)) {
                        throw new SyntaxError(`The method name "${ methodName }" is invalid`);
                    }

                    if (classMetadata.methods[methodName] || classMetadata.properties[methodName]) {
                        throw new ReferenceError(`A method or property called "${ methodName }" already exists`);
                    }

                    let methodMetadata = Utils.parseMethodFunction(node.textContent.trim(), methodName);

                    let argNames = [];
                    methodMetadata.args.forEach(arg => {
                        if (arg.destructure) {
                            if (arg.name) {
                                argNames.push(arg.name);
                            }
                            arg.properties.forEach(prop => {
                                argNames.push(prop.name);
                            });
                        } else {
                            argNames.push(arg.name);
                        }
                    });

                    let realFunc = Function.apply(undefined, Utils.concat(argNames, ['self', 'parent', `"use strict";${ methodMetadata.body }`]));

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
                                    throw new TypeError(`Argument ${ argIdx } must be provided`);
                                }

                                // This will be undefined if there is no default value
                                providedArgument = Utils.typeOf(arg.defaultValue, TYPEOF_FUNCTION) ? arg.defaultValue() : arg.defaultValue;

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
                                throw new TypeError(`Argument ${ argIdx } should be of type "${ arg.type }"`);
                            }

                            if (arg.destructure) {
                                if (arg.name) {
                                    pushTo.push(providedArgument);
                                }
                                arg.properties.forEach((prop, propIdx) => {
                                    let propKey;
                                    let providedProperty;

                                    if (providedArgumentIsOmittedDestructure) {
                                        // If destructuring argument is optional and was not provided,
                                        // then all containing properties are also optional
                                        providedProperty = undefined;
                                    } else if (arg.type == 'Object') {
                                        providedProperty = providedArgument[prop.name];
                                        propKey = prop.name;
                                    } else { // arg.type is 'Array'
                                        propKey = propIdx;
                                        providedProperty = providedArgument[propIdx];
                                    }

                                    if (providedProperty === undefined) {
                                        // All containing properties are optional
                                        // if the destructuring argument is optional
                                        // regardless of invididual property settings
                                        if (!providedArgumentIsOmittedDestructure && !prop.optional) {
                                            throw new TypeError(`Property "${ propKey }" in the ${ arg.type } provided as argument ${ argIdx } must be provided`);
                                        }
                                        // This will be undefined if there is no default value
                                        providedProperty = Utils.typeOf(prop.defaultValue, TYPEOF_FUNCTION) ? prop.defaultValue() : prop.defaultValue;
                                    } else if (prop.type && !Utils.isType(prop.type, providedProperty)) {
                                        throw new TypeError(`Property "${ propKey }" in the ${ arg.type } provided as argument ${ argIdx } should be of type "${ prop.type }"`);
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
                            providedArguments.forEach((providedArgument, offset) => {
                                let argIdx = collectArgIdx + offset;

                                if (collectArg.type && !Utils.isType(collectArg.type, providedArgument)) {
                                    throw new TypeError(`Argument ${ argIdx } should be of type "${ collectArg.type }"`);
                                }

                                providedArgumentsUsedCount++;

                                collectedVals.push(providedArgument);
                            });
                            if (!collectedVals.length && !collectArg.optional) {
                                throw new ReferenceError(`No arguments were provided to a collecting argument`);
                            }
                            lftArgVals.push(collectedVals);
                        }

                        if (providedArgumentsUsedCount !== arguments.length) { // Don't use providedArguments as that has been mutated
                            throw new ReferenceError(`Too many arguments provided`);
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
        });

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

    parseMethodFunction: (funcdef, methodName) => {
        let regexpMatches = /^function *([a-zA-Z_][a-zA-Z0-9_]+)?\s*\(/.exec(funcdef);
        if (!regexpMatches) {
            throw new SyntaxError(`Invalid function declaration for method "${ methodName }"`);
        }

        let funcName = regexpMatches[1];
        if (funcName) {
            throw new SyntaxError(`Function names are not supported for method functions; call the "self" function in the body to do recursion`);
        }

        let toProcess = funcdef.slice(regexpMatches[0].length).trim();
        let destructuringMode = false;
        let effectiveArgNames = new StringSet();
        let args = [];
        let collectArgsCount = 0;

        while (true) {
            if (toProcess[0] == ',') {
                if (!args.length) {
                    throw new SyntaxError(`Unexpected comma`);
                }
                toProcess = toProcess.slice(1).trim();
            } else { // No comma
                if (toProcess[0] == ')') {
                    if (destructuringMode) {
                        throw new SyntaxError(`Unexpected end of function destructuring argument declaration`);
                    }
                    toProcess = toProcess.slice(1).trim();
                    break;
                } else if (toProcess[0] == '}') {
                    if (!destructuringMode) {
                        throw new SyntaxError(`Unexpected closing brace`);
                    }
                    destructuringMode = false;
                    toProcess = toProcess.slice(1).trim();
                    continue;
                } else if (destructuringMode ? args[args.length - 1].properties.length : args.length) {
                    throw new SyntaxError(`Expected comma or closing bracket`);
                }
            }

            let temp;
            if (temp = /^(\?)?([{[])/.exec(toProcess)) {
                if (destructuringMode) {
                    throw new SyntaxError(`Nested destructuring is not allowed`);
                }
                destructuringMode = true;
                let isOptional = temp[1] == '?';
                args.push({
                    destructure: true,
                    type: temp[2] == '{' ? 'Object' : 'Array',
                    name: undefined,
                    optional: isOptional,
                    properties: [],
                });
                toProcess = toProcess.slice(1 + isOptional).trim();
                continue;
            }

            let argmatches = /^([a-zA-Z.]+ )?(\?)?(\.{3})?([a-z_][a-zA-Z0-9_]*)( ?= ?)?( ?[{[]\s*)?/.exec(toProcess);
            if (!argmatches) {
                throw new SyntaxError(`Unrecognised function argument declaration`);
            }
            argmatches = argmatches.map(val => (val && val.trim()) || null);
            toProcess = toProcess.slice(argmatches[0].length).trim();

            let matchedType = argmatches[1] || undefined;
            let matchedOptionalOperator = argmatches[2];
            let matchedCollectOperator = argmatches[3];
            let matchedArgname = argmatches[4];
            let matchedEqualsSign = argmatches[5];
            let matchedOpenBrace = argmatches[6];

            if (effectiveArgNames.has(matchedArgname)) {
                throw new ReferenceError(`Argument name "${ matchedArgname }" has already been used`);
            }

            if (OOMLReservedFnArgNames.indexOf(matchedArgname) > -1) {
                throw new SyntaxError(`Argument name "${ matchedArgname }" is a reserved keyword`);
            }

            if (matchedType && OOMLFnArgTypes.indexOf(matchedType) == -1) {
                throw new TypeError(`Unrecognised argument type "${ matchedType }"`);
            }

            if (matchedOpenBrace && !matchedEqualsSign) {
                if (destructuringMode) {
                    throw new SyntaxError(`Nested destructuring is not allowed`);
                }
                if (matchedType) {
                    if ((matchedOpenBrace == '{' && matchedType != 'Object') ||
                        (matchedOpenBrace == '[' && matchedType == 'Array')
                    ) {
                        throw new TypeError(`Destructuring argument type provided is not recognised`);
                    }
                } else {
                    matchedType = matchedOpenBrace == '{' ? 'Object' : 'Array';
                }
                if (matchedCollectOperator) {
                    throw new SyntaxError(`Destructuring argument contains invalid operator`);
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
                throw new SyntaxError(`Argument with a default value has an operator`);
            }
            if (matchedEqualsSign && matchedType == 'function') {
                throw new TypeError(`An argument with type "${ matchedType }" cannot have a default argument`);
            }
            if (destructuringMode && matchedCollectOperator) {
                throw new SyntaxError(`The collect operator cannot be used inside a destructuring argument`);
            }
            if (matchedCollectOperator) {
                collectArgsCount++;
                if (collectArgsCount > 1) {
                    throw new SyntaxError(`A method cannot have more than one collecting argument`);
                }
            }

            let defaultValue = undefined;
            if (matchedEqualsSign) {
                let booleanMatch;
                let digitsMatch;

                if (/^null/.test(toProcess)) {
                    toProcess = toProcess.slice(4);
                    defaultValue = null;
                } else if (matchedType == 'null') {
                    throw new TypeError(`A null argument has an invalid default value`);
                }

                else if (matchedOpenBrace == '{' && toProcess[0] == '}') {
                    toProcess = toProcess.slice(1);
                    defaultValue = Utils.createCleanObject;
                } else if (matchedType == 'Object') {
                    throw new TypeError(`An object argument has an invalid default value`);
                }

                else if (matchedOpenBrace == '[' && toProcess[0] == ']') {
                    toProcess = toProcess.slice(1);
                    // Need to bind as matchedType is not scoped and will mutate
                    defaultValue = Array;
                } else if (matchedType == 'Array') {
                    throw new TypeError(`An array argument has an invalid default value`);
                }

                else if (booleanMatch = /^(true|false)/.exec(toProcess)) {
                    toProcess = toProcess.slice(booleanMatch[0].length);
                    defaultValue = booleanMatch[0] == 'true';
                } else if (matchedType == 'boolean') {
                    throw new TypeError(`A boolean argument has an invalid default value`);
                }

                else if (toProcess[0] == '"' || toProcess[0] == "'") {
                    let parseFlagStringEndChar = toProcess[0];
                    let done = false;
                    toProcess = toProcess.slice(1);
                    defaultValue = '';
                    while (!done) {
                        if (!toProcess.length) {
                            throw new SyntaxError(`Unexpected end of input`);
                        }

                        let tempIndex = toProcess.indexOf(parseFlagStringEndChar);
                        if (tempIndex == -1) {
                            // .slice to prevent super-long messages
                            throw new TypeError(`A string argument has an invalid default value at "${ toProcess.slice(0, 200) }"`);
                        }

                        let tempValue = toProcess.slice(0, tempIndex);

                        let tempRegexp = /\\+$/.exec(tempValue);
                        if (!tempRegexp || tempRegexp[0].length % 2 == 0) {
                            defaultValue += eval(parseFlagStringEndChar + tempValue + parseFlagStringEndChar);
                            done = true;
                        } else {
                            defaultValue += eval(parseFlagStringEndChar + tempValue + parseFlagStringEndChar + parseFlagStringEndChar);
                        }

                        toProcess = toProcess.slice(tempIndex + 1);
                    }
                } else if (matchedType == 'string') {
                    throw new TypeError(`A string argument has an invalid default value`);
                }

                else if (digitsMatch = /^(?:0b[01]+|0o[0-7]+|0x[0-9a-f]+|[0-9]*\.?[0-9]+(?:e[0-9]+)?)/i.exec(toProcess)) {
                    toProcess = toProcess.slice(digitsMatch[0].length);
                    defaultValue = Number(digitsMatch[0]);
                    if (!Utils.isType(matchedType, defaultValue)) { // Will check for NaN if necessary
                        throw new TypeError(`A number argument has an invalid default value`);
                    }
                } else if (OOMLPropertyNumberTypes.indexOf(matchedType) > -1) {
                    throw new TypeError(`A number argument has an invalid default value`);
                } else {
                    throw new TypeError(`Unrecognised default value`);
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
            throw new SyntaxError(`Function body braces are missing`);
        }

        let funcBody = toProcess.slice(1, -1).trim();

        return {
            args: args,
            body: funcBody,
        };
    },

    // Put brackets around as harmony minifier doesn't work without them
    isValidAttributeName: name => (/^[a-z]+([A-Z][a-z]*)*$/.test(name)),

    isValidPropertyName: (name, strictMode) =>
        Utils.typeOf(name, TYPEOF_STRING) &&
        !!name.length &&
        name[0] != '$' &&
        // Double underscore prefix
        !(name[0] == '_' && name[1] == '_') &&
        // Starting or trailing whitespace
        !/^\s|\s$/.test(name) &&
        OOMLReservedPropertyNames.indexOf(name) == -1 &&
        (!strictMode || /^[a-z][a-zA-Z0-9_]*$/.test(name)),

    toDashCase: str => str.replace(/^[a-z]+|(?!^)(?:[A-Z][a-z]*)/g, match => match.toLowerCase() + '-').slice(0, -1),

    getEvalValue: codeStr => Function(`return ${ codeStr.trim() || undefined }`)(),

    clone: obj => {
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

    // Use full function declaration for "arguments" object
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

    isOOMLClass: c => Utils.typeOf(c, TYPEOF_FUNCTION) && c.prototype instanceof OOML.Element,

    isPrimitiveValue: val => Utils.isType(OOMLPrimitiveTypes, val),

    // typeof null == 'object'
    // Use typeof as .getPrototypeOf can't be used with non-objects
    // Object.create(null) is NOT instanceof Object, so don't use instanceof
    isObjectLiteral: (obj) => !!obj && Utils.typeOf(obj, TYPEOF_OBJECT) && (obj.constructor == Object || Object.getPrototypeOf(obj) === null),

    isType: (type, value) => {
        if (Array.isArray(type)) {
            return type.some(t => Utils.isType(t, value));
        }
        switch (type) {
            case 'null':
                return value === null;

            case 'number':
            case 'boolean':
            case 'string':
            case 'function':
                return typeof value == type;

            case 'natural':
            case 'integer':
                return Utils.typeOf(value, TYPEOF_NUMBER) &&
                    isFinite(value) &&
                    Math.floor(value) === value &&
                    (type != 'natural' || value >= 0);

            case 'float':
                // Floats can have zero remainder, as there is no real difference between int and float in JS
                return Utils.typeOf(value, TYPEOF_NUMBER) &&
                    isFinite(value); // Returns false on NaN and +/-Infinity

            case 'Object':
                return Utils.isObjectLiteral(value);

            case 'Array':
                return Array.isArray(value);

            default:
                throw new Error(`Unrecognised type for checking against`);
        }
    },

    createCleanObject: () => Object.create(null),

    constructElement: (elemConstructor, obj) => {
        if (obj instanceof elemConstructor) {
            return obj;
        } else if (elemConstructor == OOML.Element || elemConstructor == HTMLElement) {
            throw new TypeError(`Unable to construct new instance; the type is an abstract class`);
        } else if (!Utils.isObjectLiteral(obj)) {
            throw new TypeError(`Unable to construct new instance; the provided object is not of the correct type`);
        }

        return new elemConstructor(obj);
    },
};
