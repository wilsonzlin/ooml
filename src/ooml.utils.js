var Utils = {
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
    },
    parseMethodFunction: function(funcdef, methodName) {
        var regexpMatches = /^function *([a-zA-Z_][a-zA-Z0-9_]+)?\s*\(/.exec(funcdef);
        if (!regexpMatches) {
            throw new SyntaxError('Invalid function declaration for method `' + methodName + '`');
        }

        var funcName = regexpMatches[1];
        if (funcName) {
            throw new SyntaxError('Function names are not supported for method functions; call the `self` function in the body to do recursion');
        }

        var toProcess = funcdef.slice(regexpMatches[0].length).trim();
        var destructuringMode = false;
        var effectiveArgNames = new StringSet();
        var args = [];
        var collectArgsCount = 0;

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

            var temp;
            if (temp = /^(\?)?([\{\[])/.exec(toProcess)) {
                if (destructuringMode) {
                    throw new SyntaxError('Nested destructuring is not allowed');
                }
                destructuringMode = true;
                var isOptional = temp[1] == '?';
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

            var argmatches = /^([a-zA-Z.]+ )?(\?)?(\.\.\.)?([a-z_][a-zA-Z0-9_]*)( ?= ?)?( ?[\{\[]\s*)?/.exec(toProcess);
            if (!argmatches) {
                throw new SyntaxError('Unrecognised function argument declaration');
            }
            argmatches = argmatches.map(function(val) {
                var trimmed = val ? val.trim() : null;
                return trimmed || null; // In case string was originally only whitespace
            });
            toProcess = toProcess.slice(argmatches[0].length).trim();

            var matchedType = argmatches[1] || undefined;
            var matchedOptionalOperator = argmatches[2];
            var matchedCollectOperator = argmatches[3];
            var matchedArgname = argmatches[4];
            var matchedEqualsSign = argmatches[5];
            var matchedOpenBrace = argmatches[6];

            if (effectiveArgNames.has(matchedArgname)) {
                throw new SyntaxError('Argument name `' + matchedArgname + '` has already been used');
            }
            // NOTE: Obviously list not complete, but hopefully the rest should be obvious...
            if (['self', 'parent', 'arguments', 'super', 'this', 'class'].indexOf(matchedArgname) > -1) {
                throw new SyntaxError('Argument name `' + matchedArgname + '` is a reserved keyword');
            }

            if (matchedType && OOML_FUNCTION_ARGUMENT_TYPE_DECLARATIONS.indexOf(matchedType) == -1) {
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

            var defaultValue = undefined;
            if (matchedEqualsSign) {
                var booleanMatch;
                var dateConstructorMatch;
                var digitsMatch;

                if (toProcess.indexOf('null') == 0) {
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
                    var parseFlagStringEscape = false;
                    var parseFlagStringEndChar = toProcess[0];
                    var ended = false;
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
                                    var escapeMatches = /^(u([a-fA-F0-9]{4}|\{[a-fA-F0-9]+\})|x[a-fA-F0-9]{2})/.exec(toProcess);
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

            var pushTo = destructuringMode ? args[args.length - 1].properties : args;
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

        var funcBody = toProcess.slice(1, -1).trim();

        return {
            args: args,
            body: funcBody,
        };
    },
    isValidPropertyName: function(name, strictMode) {
        return typeof name == 'string' &&
            !!name.length &&
            name[0] != '$' &&
            // Double underscore prefix
            !(name[0] == '_' && name[1] == '_') &&
            // Starting or trailing whitespace
            !/^\s|\s$/.test(name) &&
            OOML_ELEMENT_RESERVED_PROPERTY_NAMES.indexOf(name) == -1 &&
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
    concat: function() {
        // WARNING: Don't use .concat as that doesn't work with array-like objects
        // e.g. [].concat(NodeList(div, span)) becomes [NodeList], not [div, span]
        var ret = Array.prototype.slice.call(arguments[0]);
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] && arguments[i].length) {
                Array.prototype.push.apply(ret, arguments[i]);
            }
        }
        return ret;
    },
    pushAll: function() {
        var arr = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
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

        var length = obj.length;
        if (!Utils.isType('natural', length)) {
            return false;
        }

        if (obj.hasOwnProperty('length')) {
            return false;
        }

        var descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), 'length');
        if (!descriptor || !descriptor.get || descriptor.set) {
            return false;
        }

        return true;
    },
    isOOMLClass: function(klass) {
        return klass.prototype instanceof OOML.Element.prototype;
    },
    isPrimitiveValue: function(val) {
        return OOML_PRIMITIVE_TYPES.some(function(type) { return Utils.isType(type, val) });
    },
    isObjectLiteral: function(obj) {
        // Use typeof as .getPrototypeOf can't be used with non-objects
        return typeof obj == 'object' && (obj.constructor == Object || Object.getPrototypeOf(obj) === null);
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
    /* OVERRIDE: NOT IN USE but keep notes
    arraysHaveSameElems: function(arr1, arr2) {
        /*
            Returns true if both arrays contain:
                - the same elements
                - the same amount of times
                - not necessarily in the same order

            Cases to consider before judging and chaning this code:
                - arr1 = ['foo', 'foo', 'bar']; arr2 = ['foo', 'bar'];
                - arr1 = [1, 1, 2, 3]; arr2 = [1, 2, 3, 3]; arr1.length == arr2.length
                - arr1 = [2, 3, 1, Node]; arr2 = [1, 3, Node, 2]; These should be "the same"
         *
        return arr1.every(function(matchingCount, elem) {
            return arr2.indexOf(elem) > -1;
        }) && arr1.length === arr2.length;
    },
    */
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
        var strParts = [],
            paramMap = Utils.createCleanObject();

        while (true) {
            var posOfOpeningBraces = str.indexOf('{{');
            if (posOfOpeningBraces < 0) {
                if (str) strParts.push(str);
                break;
            }
            var strBeforeParam = str.slice(0, posOfOpeningBraces);
            if (strBeforeParam) strParts.push(strBeforeParam);
            str = str.slice(posOfOpeningBraces + 2);

            var posOfClosingBraces = str.indexOf('}}');
            if (posOfClosingBraces < 0) {
                throw new SyntaxError('Unexpected end of input; expected closing text parameter braces');
            }
            var param = str.slice(0, posOfClosingBraces).trim().slice(5); // Remove "this."
            // Assume param is a well-formatted JS property name
            if (!paramMap[param]) paramMap[param] = [];
            paramMap[param].push(strParts.length);
            strParts.push('');

            str = str.slice(posOfClosingBraces + 2);
        }

        return {
            parts: strParts,
            map: paramMap,
        };
    },
    cloneElemForInstantiation: function cloneElemForInstantiation(rootElem) {

        var clonedElem;

        if (rootElem instanceof Element) {

            clonedElem = document.createElement(rootElem.nodeName);

            if (rootElem[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]) {
                clonedElem[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS] = rootElem[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]; // Don't clone; keep reference to original function
            }
            if (rootElem[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]) {
                clonedElem[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS] = rootElem[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]; // Don't clone; keep reference to original function
            }

            for (var i = 0; i < rootElem.attributes.length; i++) {
                var rootAttr = rootElem.attributes[i];
                var clonedAttr = document.createAttribute(rootAttr.name);
                clonedAttr.nodeValue = rootAttr.nodeValue;

                if (rootAttr[OOML_NODE_PROPNAME_TEXTFORMAT]) {
                    clonedAttr[OOML_NODE_PROPNAME_TEXTFORMAT] = rootAttr[OOML_NODE_PROPNAME_TEXTFORMAT].slice();
                }
                if (rootAttr[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
                    clonedAttr[OOML_NODE_PROPNAME_FORMATPARAMMAP] = rootAttr[OOML_NODE_PROPNAME_FORMATPARAMMAP]; // Probably don't need to clone as it will never be mutilated
                }

                clonedElem.setAttributeNode(clonedAttr);
            }

            for (var i = 0; i < rootElem.childNodes.length; i++) {
                var clonedChild = cloneElemForInstantiation(rootElem.childNodes[i]);
                if (clonedChild) {
                    clonedElem.appendChild(clonedChild);
                }
            }

        } else if (rootElem instanceof Text) {

            clonedElem = document.createTextNode(rootElem.nodeValue);
            if (rootElem[OOML_NODE_PROPNAME_TEXTFORMAT]) {
                clonedElem[OOML_NODE_PROPNAME_TEXTFORMAT] = rootElem[OOML_NODE_PROPNAME_TEXTFORMAT].slice();
            }
            if (rootElem[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
                clonedElem[OOML_NODE_PROPNAME_FORMATPARAMMAP] = rootElem[OOML_NODE_PROPNAME_FORMATPARAMMAP]; // Probably don't need to clone as it will never be mutilated
            }

        } else if (rootElem instanceof Comment) {

            clonedElem = document.createComment(rootElem.nodeValue);
            if (rootElem[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG]) {
                clonedElem[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG] = rootElem[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG]; // Probably don't need to clone as it will never be mutilated
            }

        }

        return clonedElem;
    },
};
