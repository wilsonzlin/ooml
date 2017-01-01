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
    isValidFunctionArgumentName: function(name) {
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
    },
    parseMethodFunction: function(funcdef, methodName) {
        var regexpMatches = /^function *([a-zA-Z][a-zA-Z0-9_]+)?\s*\(/.exec(funcdef);
        if (!regexpMatches) {
            throw new SyntaxError('Invalid function declaration for method `' + methodName + '`');
        }

        var funcName = regexpMatches[1];
        if (funcName) {
            throw new SyntaxError('Function names are not supported for method functions');
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

            var argmatches = /^([a-zA-Z.]+ )?(\?|\.\.\.)?([a-z_][a-zA-Z0-9_]*)( ?= ?)?( ?[\{\[]\s*)?/.exec(toProcess);
            if (!argmatches) {
                throw new SyntaxError('Unrecognised function argument declaration');
            }
            argmatches = argmatches.map(function(val) {
                var trimmed = val ? val.trim() : null;
                return trimmed || null; // In case string was originally only whitespace
            });
            toProcess = toProcess.slice(argmatches[0].length).trim();

            var matchedType = argmatches[1] || undefined;
            var matchedOperator = argmatches[2];
            var matchedArgname = argmatches[3];
            var matchedEqualsSign = argmatches[4];
            var matchedOpenBrace = argmatches[5];

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
                if (matchedOperator && matchedOperator != '?') {
                    throw new SyntaxError('Destructuring argument contains invalid operator');
                }

                destructuringMode = true;
                args.push({
                    destructure: true,
                    type: matchedType,
                    name: matchedArgname,
                    optional: !!matchedOperator,
                    properties: [],
                });
                continue;
            }

            if (matchedEqualsSign && matchedOperator) {
                throw new SyntaxError('Argument with a default value has an operator');
            }
            if (matchedEqualsSign && ['function', 'OOML.Element'].indexOf(matchedType) > -1) {
                throw new SyntaxError('An argument with type ' + matchedType + ' cannot have a default argument');
            }
            if (destructuringMode && matchedOperator == '...') {
                throw new SyntaxError('The collect operator cannot be used inside a destructuring argument');
            }
            if (matchedOperator == '...' && !matchedType) {
                collectArgsCount++;
                if (collectArgsCount > 1) {
                    throw new SyntaxError('A method cannot have more than one non-typed collect argument');
                }
            }

            var defaultValue = undefined;
            while (matchedEqualsSign) { // Use while to break out of this block easily
                if (toProcess.indexOf('null') == 0) {
                    toProcess = toProcess.slice(4);
                    defaultValue = null;
                    break;
                } else if (matchedType == 'null') {
                    throw new SyntaxError('A null argument has an invalid default value');
                }

                if (matchedOpenBrace == '{' && toProcess[0] == '}') {
                    toProcess = toProcess.slice(1);
                    defaultValue = Utils.createCleanObject;
                    break;
                } else if (matchedType == 'object') {
                    throw new SyntaxError('An object argument has an invalid default value');
                }

                if (matchedOpenBrace == '[' && toProcess[0] == ']') {
                    toProcess = toProcess.slice(1);
                    // Need to bind as matchedType is not scoped and will mutate
                    defaultValue = function (type) {
                        return type == 'OOML.Array' ? new OOML.Array : []
                    }.bind(matchedType);
                    break;
                } else if (['array', 'Array', 'OOML.Array'].indexOf(matchedType) > -1) {
                    throw new SyntaxError('An array argument has an invalid default value');
                }

                var booleanMatch = /^(true|false)/.exec(toProcess);
                if (booleanMatch) {
                    toProcess = toProcess.slice(booleanMatch[0].length);
                    defaultValue = booleanMatch[0] == 'true';
                    break;
                } else if (matchedType == 'boolean') {
                    throw new SyntaxError('A boolean argument has an invalid default value');
                }

                var dateConstructorMatch = /^new Date\(\s*((?:[0-9]+,\s*)*(?:[0-9]+)?)\s*\)/.exec(toProcess);
                if (dateConstructorMatch) {
                    toProcess = toProcess.slice(dateConstructorMatch[0].length);
                    defaultValue = Function('return ' + dateConstructorMatch);
                    break;
                } else if (matchedType == 'Date') {
                    throw new SyntaxError('A Date argument has an invalid default value');
                }

                if (toProcess[0] == '"' || toProcess[0] == "'") {
                    toProcess = toProcess.slice(1);
                    defaultValue = '';
                    var parseFlagStringEscape = false;
                    var ended = false;
                    while (!ended) {
                        switch (toProcess[0]) {
                            case '"':
                            case "'":
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
                                    if (toProcess[0] == 'u') {
                                        defaultValue += (function () {
                                            toProcess = toProcess.slice(1);
                                            var ret;

                                            if (toProcess[0] == '{') {
                                                toProcess = toProcess.slice(1);
                                                var indexOfClosingBrace = Math.min(toProcess.indexOf('}'), 6);
                                                ret = eval('"\\u{' + toProcess.slice(0, indexOfClosingBrace) + '}"');
                                                toProcess = toProcess.slice(indexOfClosingBrace); // Leave brace to be sliced by outer .slice call
                                            } else {
                                                var regexpMatches = /^([0-9a-f]{2}){1,2}/i.exec(toProcess);
                                                ret = eval('"\\u' + regexpMatches[0] + '"');
                                                toProcess = toProcess.slice(regexpMatches[0].length); // Leave last character to be sliced by outer .slice call
                                            }

                                            return ret;
                                        })();
                                    } else if (toProcess[0] == 'x') {
                                        defaultValue += eval('"\\x' + toProcess.slice(0, 2) + '"');
                                        toProcess = toProcess.slice(1); // Leave last character to be sliced by outer .slice call
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
                    break;
                } else if (matchedType == 'string') {
                    throw new SyntaxError('A string argument has an invalid default value');
                }

                var digitsMatch = /^(?:0b[01]+|0o[0-7]+|0x[0-9a-f]+|[0-9]*\.?[0-9]+(?:e[0-9]+)?)/i.exec(toProcess);
                if (digitsMatch && digitsMatch[0]) {
                    toProcess = toProcess.slice(digitsMatch[0].length);
                    defaultValue = Number(digitsMatch[0]);
                    if (!Utils.isType(matchedType, defaultValue)) { // Will check for NaN if necessary
                        throw new SyntaxError('A number argument has an invalid default value');
                    }
                    break;
                } else if (['number', 'natural', 'integer', 'float'].indexOf(matchedType) > -1) {
                    throw new SyntaxError('A number argument has an invalid default value');
                }

                throw new SyntaxError('Unrecognised default value');
            }

            var pushTo = destructuringMode ? args[args.length - 1].properties : args;
            pushTo.push({
                type: matchedType,
                name: matchedArgname,
                optional: matchedOperator == '?' || defaultValue !== undefined,
                collect: matchedOperator == '...',
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
        return !(
            // Double underscore prefix
            (name[0] == '_' && name[1] == '_') ||
            // Trailing whitespace
            /\s$/.test(name) ||
            // Object.prototype
            ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'].indexOf(name) > -1 ||
            // OOML.Element.prototype
            ['toObject', 'toJSON', 'assign'].indexOf(name) > -1 &&
            (!strictMode || /^[a-z][a-zA-Z0-9_]*$/.test(name))
        );
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
            Array.prototype.push.apply(ret, arguments[i]);
        }
        return ret;
    },
    pushAll: function() {
        var arr = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            Array.prototype.push.apply(arr, arguments[i]);
        }
    },
    isOOMLClass: function(klass) {
        return klass.prototype instanceof OOML.Element.prototype;
    },
    isPrimitiveValue: function(val) {
        return val instanceof Date || val === null || Array.isArray(val) || ['number', 'boolean', 'string'].indexOf(typeof val) > -1
    },
    isObjectLiteral: function(obj) {
        return !!obj && (obj.constructor == Object || Object.getPrototypeOf(obj) === null);
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
                    isFinite(value);

            case 'object':
                return Utils.isObjectLiteral(value);

            case 'array':
                return Array.isArray(value) || value instanceof OOML.Array;

            case 'function':
                return !!value && value.constructor == Function;

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
