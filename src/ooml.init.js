OOML.Namespace = function(namespace, settings) {

    if (!(this instanceof OOML.Namespace)) {
        throw new SyntaxError('OOML.Namespace must be constructed');
    }

    namespace = namespace || document.body;
    Utils.DOM.noAncestorNamespace(namespace);

    settings = settings || {};
    var imports = Utils.concat(OOMLGlobalImports, settings.imports || Utils.createCleanObject());

    var classes = Utils.createCleanObject(),
        objects = Utils.createCleanObject();

    var SETTING_STRICT_PROPERTY_NAMES = settings.strictPropertyNames !== false;

    var GET_OOML_CLASS = function(className) {
        if (classes[className]) {
            return classes[className];
        }

        var ret = imports;
        className.split('.').every(function(part) {
            ret = ret[part];
            return !!ret;
        });

        if (!Utils.isOOMLClass(ret)) {
            throw new TypeError('The class ' + className + ' does not exist');
        }

        return ret;
    };

    if (typeof namespace == 'string') {
        namespace = namespace.trim();
        if (namespace[0] == '<') {
            var domParser = document.createElement('div');
            domParser.innerHTML = namespace;
            namespace = domParser;
        } else {
            namespace = document.querySelector(namespace);
        }
    }

    Utils.DOM.find(namespace, 'template[ooml-class], template[ooml-abstract-class]').forEach(function(classTemplateElem) {
        // Parse declaration
        var classDeclaration = classTemplateElem.getAttribute('ooml-class');
        var CLASS_IS_ABSTRACT = false;
        if (!classDeclaration) {
            classDeclaration = classTemplateElem.getAttribute('ooml-abstract-class');
            CLASS_IS_ABSTRACT = true;
        }
        var classDeclarationParts = /^([a-zA-Z]+)(?: extends ((?:[a-zA-Z]+\.)*(?:[a-zA-Z]+)))?$/.exec(classDeclaration);
        if (!classDeclarationParts) {
            throw new SyntaxError('Bad class declaration at `' + classDeclaration + '`');
        }

        // Get new class name
        var CLASS_NAME = classDeclarationParts[1];
        if (classes[CLASS_NAME]) {
            throw new SyntaxError('The class ' + CLASS_NAME + ' has already been initialised');
        }

        // Get parent class
        var CLASS_PARENT_CLASS;
        if (classDeclarationParts[2]) {
            CLASS_PARENT_CLASS = GET_OOML_CLASS(classDeclarationParts[2]);
        } else {
            CLASS_PARENT_CLASS = OOML.Element;
        }

        var PROCESS_PROPERTY_DECLARATION = function(types, name) {
            if (!Utils.isValidPropertyName(name, SETTING_STRICT_PROPERTY_NAMES)) {
                throw new SyntaxError('Invalid property declaration; name `' + name + '` is invalid');
            }
            if (types !== null) {
                if (CLASS_PROPERTIES_TYPES[name]) {
                    if (CLASS_PROPERTIES_TYPES[name].join('|') !== types) {
                        throw new SyntaxError('Types for the property ' + name + ' have already been declared');
                    }
                } else {
                    CLASS_PROPERTIES_TYPES[name] = types.split('|').filter(function (type, idx, types) {
                        if (OOML_PROPERTY_TYPE_DECLARATIONS.indexOf(type) == -1) {
                            throw new SyntaxError('Invalid type declaration `' + type + '` for property ' + name);
                        }
                        if (types.indexOf(type) !== idx) {
                            throw new SyntaxError('Duplicate type `' + type + '` in type declaration for property ' + name);
                        }
                        return true;
                    });
                }
            }
        };

        // A set containing all the properties' names in this class
        var CLASS_PROPERTIES_NAMES = new StringSet();

        // A map from property names to an array containing their accepted value types
        var CLASS_PROPERTIES_TYPES = Utils.createCleanObject();

        /*
            CLASS_ARRAY_PROPERTIES_NAMES and CLASS_ELEM_PROPERTIES_NAMES are used:
                - to check for duplicates
                - conditionally create special setters for instance properties
        */
        var CLASS_ARRAY_PROPERTIES_NAMES = new StringSet();
        var CLASS_ELEM_PROPERTIES_NAMES = new StringSet();

        // An object mapping class attributes' names to their default value
        var CLASS_PREDEFINED_ATTRIBUTES_VALUES = Utils.createCleanObject();

        // An object mapping class properties' names to their default value
        var CLASS_PREDEFINED_PROPERTIES_VALUES = Utils.createCleanObject();

        // An object mapping class properties' names to their function
        var CLASS_PREDEFINED_METHODS_FUNCTIONS = Utils.createCleanObject();
        var CLASS_PREDEFINED_CONSTRUCTOR;


        // Get all nodes in template to process
        var toProcess = OOMLCompatTemplateExists ?
            Utils.concat(document.importNode(classTemplateElem.content, true).childNodes) :
            Utils.concat(classTemplateElem.childNodes);

        // Process predefined attributes (attributes must be defined first)
        // Note: Don't need to remove ooml-attribute, ooml-property or ooml-method as parent template is removed after parsing
        var breakOuter = false;
        while (toProcess.length && !breakOuter) {
            var node = toProcess.shift();
            if (!(node instanceof Element)) {
                continue;
            }

            switch (node.nodeName) {
                case 'OOML-ATTRIBUTE':

                    var attrName = node.getAttribute('name');
                    if (CLASS_PREDEFINED_ATTRIBUTES_VALUES[attrName] !== undefined) {
                        throw new SyntaxError('The attribute ' + attrName + ' is already defined');
                    }
                    if (!/^[a-z]+([A-Z][a-z]*)*$/.test(attrName)) {
                        throw new SyntaxError('The attribute name ' + attrName + ' is invalid');
                    }

                    var evalValue = Utils.getEvalValue(node.textContent);
                    if (!Utils.isPrimitiveValue(evalValue)) {
                        throw new TypeError('The value for the attribute ' + attrName + ' is invalid');
                    }

                    CLASS_PREDEFINED_ATTRIBUTES_VALUES[attrName] = evalValue;

                    break;

                case 'OOML-PROPERTY':

                    var propName = node.getAttribute('name');
                    var types = node.getAttribute('type') || null;
                    PROCESS_PROPERTY_DECLARATION(types, propName);

                    if (CLASS_PREDEFINED_PROPERTIES_VALUES[propName] !== undefined) {
                        throw new SyntaxError('The property ' + propName + ' is already defined');
                    }

                    var evalValue = Utils.getEvalValue(node.textContent);
                    if (!Utils.isPrimitiveValue(evalValue)) {
                        throw new TypeError('The value for the property ' + propName + ' is invalid');
                    }

                    CLASS_PREDEFINED_PROPERTIES_VALUES[propName] = evalValue;
                    CLASS_PROPERTIES_NAMES.add(propName);

                    break;

                case 'OOML-METHOD':

                    (function() {
                        var methodName = node.getAttribute('name');

                        if (methodName == 'constructor') {
                            if (CLASS_PREDEFINED_CONSTRUCTOR) {
                                throw new SyntaxError('A constructor has already been defined for the class ' + CLASS_NAME);
                            }
                            CLASS_PREDEFINED_CONSTRUCTOR = Utils.getEvalValue(node.textContent.trim());
                            if (typeof CLASS_PREDEFINED_CONSTRUCTOR != 'function') {
                                throw new TypeError('The constructor method for the class ' + CLASS_NAME + ' is not a function');
                            }
                            return;
                        }

                        if (!Utils.isValidPropertyName(methodName, false)) {
                            throw new SyntaxError('The method name `' + methodName + '` is invalid');
                        }
                        if (CLASS_PREDEFINED_METHODS_FUNCTIONS[methodName]) {
                            throw new SyntaxError('The method ' + methodName + ' is already defined');
                        }

                        var funcmeta = Utils.parseMethodFunction(node.textContent.trim(), methodName);

                        var argNames = [];
                        funcmeta.args.forEach(function(arg) {
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

                        var realFunc = Function.apply(undefined, Utils.concat(argNames, ['self', 'parent', 'arguments', funcmeta.body]));

                        CLASS_PREDEFINED_METHODS_FUNCTIONS[methodName] = function self() {
                            // See https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
                            // If arguments is length 1, manually construct, as Array constructor will interpret as length, not value
                            var providedArguments = arguments.length == 1 ? [arguments[0]] : Array.apply(undefined, arguments);
                            var providedArgument;

                            // WARNING: Won't clone nested objects and arrays, so don't mutate those
                            var definedArguments = funcmeta.args.slice();
                            var arg;
                            var argIdx = -1;

                            var providedArgumentsUsedCount = 0;
                            var lftArgVals = [];
                            var rgtArgVals = [];

                            var processingDirectionLtr = true;
                            var collectArg;
                            var collectArgIdx;

                            while (arg = definedArguments[processingDirectionLtr ? 'shift' : 'pop']()) {

                                argIdx += processingDirectionLtr ? 1 : -1;

                                if (arg.collect) {
                                    collectArg = arg;
                                    collectArgIdx = argIdx;
                                    argIdx = 0;
                                    processingDirectionLtr = false;
                                    continue;
                                }

                                var argumentProvided = providedArguments.hasOwnProperty(processingDirectionLtr ? 0 : (providedArguments.length - 1));
                                providedArgument = providedArguments[processingDirectionLtr ? 'shift' : 'pop']();
                                var pushTo = processingDirectionLtr ? lftArgVals : rgtArgVals;

                                var providedArgumentIsOmittedDestructure = false;

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
                                        var propKey;
                                        var providedProperty;

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
                                var collectedVals = [];
                                providedArguments.forEach(function(providedArgument, offset) {
                                    var argIdx = collectArgIdx + offset;

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

                            var parentMethod = CLASS_PARENT_CLASS.prototype[methodName];
                            parentMethod = parentMethod ? parentMethod.bind(this) : undefined;

                            var argVals = Utils.concat(lftArgVals, rgtArgVals.reverse(), [
                                self, parentMethod, undefined
                            ]);
                            return realFunc.apply(this, argVals);
                        };
                    })();

                    break;

                default:
                    breakOuter = true;
            }
        }

        // Trim non-elements from the right
        while (toProcess[1] && !(toProcess[1] instanceof Element)) {
            toProcess.pop();
        }

        if (CLASS_IS_ABSTRACT) {
            if (toProcess.length) {
                throw new SyntaxError('The abstract class ' + CLASS_NAME + ' has root elements');
            }
        } else {
            if (toProcess.length != 1) {
                throw new SyntaxError('The class ' + CLASS_NAME + ' is empty or contains more than one root element');
            }
        }
        toProcess = [toProcess[0]];

        var CLASS_ROOT_ELEM = toProcess[0];
        var current;

        // Remove template (class declaration) element
        classTemplateElem.parentNode.removeChild(classTemplateElem);

        while (current = toProcess.shift()) {

            if (current instanceof Element) {

                // Concat to prevent indexes from changing when removing inline event handler attributes
                Utils.concat(current.attributes).forEach(function(attr) {
                    if (attr.name.indexOf('childon') === 0) {
                        if (!current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]) current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS] = Utils.createCleanObject();
                        current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS][attr.name.slice(7)] = Function('$self', 'dispatch', 'data', attr.nodeValue);
                        current.removeAttributeNode(attr);
                    } else if (attr.name.indexOf('domon') === 0) {
                        var eventName = attr.name.slice(5);
                        if (!current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]) {
                            current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS] = Utils.createCleanObject();
                        } else if (current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS][eventName]) {
                            throw new SyntaxError('Another DOM ' + eventName + ' event handler already exists');
                        }
                        current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS][eventName] = Function('$self', 'dispatch', 'event', 'event.preventDefault();' + attr.nodeValue);
                        current.removeAttributeNode(attr);
                    } else if (attr.name.indexOf('on') === 0) {
                        throw new SyntaxError('Native DOM event handlers are not allowed');
                    } else {
                        toProcess.push(attr);
                    }
                });

                Utils.pushAll(toProcess, current.childNodes);

            } else if (current instanceof Text) {

                var currentNode = current;
                var indexOfOpeningBrace;

                while ((indexOfOpeningBrace = currentNode.nodeValue.indexOf('{')) > -1) {
                    // .splitText returns the new Text node that contains the REMAINING TEXT AFTER
                    currentNode = currentNode.splitText(indexOfOpeningBrace);
                    var nodeValue = currentNode.nodeValue;

                    // currentNode.nodeValue is now one of:
                    // "{{ this.propName }}"
                    // "{ for ClassName of this.propName }"
                    // "{ ClassName this.propName }"
                    // Therefore the index of the closing brace can't be less than 3
                    var indexOfClosingBrace = nodeValue.indexOf('}');
                    if (indexOfClosingBrace < 3) {
                        throw new SyntaxError('Matching closing brace not found');
                    }
                    // Remove first opening and all closing braces:
                    // "{{ this.propName }}"         becomes "{ this.propName "
                    // "{ ClassName this.propName }" becomes " ClassName this.propName "
                    var code = nodeValue.slice(1, indexOfClosingBrace);

                    var regexpMatches;
                    if (code[0] == '{') {
                        // NOTE: There is some repetition of the following logic
                        //       and logic in PROCESS_PROPERTY_DECLARATION
                        regexpMatches = /^\{(?: ((?:(?:[a-zA-Z]+)\|)*[a-zA-Z]+))? this\.(.+?) $/.exec(code);
                        if (!regexpMatches || !regexpMatches[2]) {
                            throw new SyntaxError('Invalid property declaration at `' + code + '`');
                        }

                        var propName = regexpMatches[2];
                        PROCESS_PROPERTY_DECLARATION(regexpMatches[1] || null, propName);
                        CLASS_PROPERTIES_NAMES.add(propName);

                        var textSubstitutionNode = currentNode;
                        currentNode = currentNode.splitText(indexOfClosingBrace + 2);

                        textSubstitutionNode[OOML_NODE_PROPNAME_TEXTFORMAT] = [''];
                        textSubstitutionNode[OOML_NODE_PROPNAME_FORMATPARAMMAP] = Utils.createCleanObject();
                        textSubstitutionNode[OOML_NODE_PROPNAME_FORMATPARAMMAP][propName] = [0];

                    } else {
                        regexpMatches = /^ (?:for ((?:[a-zA-Z]+\.)*(?:[a-zA-Z]+)) of|((?:[a-zA-Z]+\.)*(?:[a-zA-Z]+))) this\.([a-zA-Z0-9_]+) $/.exec(code);
                        if (!regexpMatches || !regexpMatches[3] || (!regexpMatches[1] && !regexpMatches[2])) {
                            throw new SyntaxError('Invalid element substitution at `' + code + '`');
                        }

                        var toRemove = currentNode;
                        var elemSubstitutionCommentNode = document.createComment('');
                        currentNode = currentNode.splitText(indexOfClosingBrace + 1);
                        currentNode.parentNode.replaceChild(elemSubstitutionCommentNode, toRemove);

                        var elemConstructorName = regexpMatches[1] || regexpMatches[2];
                        var propName = regexpMatches[3];
                        var isArraySubstitution = !!regexpMatches[1];

                        // The property can be predefined but not already in use
                        // NOTE: It's not possible for more than one element substitution of the same property
                        if (CLASS_PROPERTIES_NAMES.has(propName) && CLASS_PREDEFINED_PROPERTIES_VALUES[propName] === undefined) {
                            throw new SyntaxError('The property ' + propName + ' is already defined');
                        }
                        CLASS_PROPERTIES_NAMES.add(propName);

                        var elemConstructor =
                            elemConstructorName == 'HTMLElement' ? HTMLElement :
                                elemConstructorName == 'OOML.Element' ? OOML.Element :
                                    GET_OOML_CLASS(elemConstructorName);

                        if (isArraySubstitution) {
                            CLASS_ARRAY_PROPERTIES_NAMES.add(propName);
                        } else {
                            CLASS_ELEM_PROPERTIES_NAMES.add(propName);
                        }

                        elemSubstitutionCommentNode[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG] = {
                            elemConstructor: elemConstructor,
                            propName: propName,
                            isArray: isArraySubstitution
                        };
                    }
                }

            } else if (current instanceof Attr) {

                var nodeValue = current.nodeValue;

                if (nodeValue.indexOf('{{') > -1) {
                    var paramsData = Utils.splitStringByParamholders(nodeValue);
                    current[OOML_NODE_PROPNAME_TEXTFORMAT] = paramsData.parts;
                    current[OOML_NODE_PROPNAME_FORMATPARAMMAP] = paramsData.map;

                    Object.keys(paramsData.map).forEach(function(fullPropName) { // Use Object.keys to avoid scope issues
                        CLASS_PROPERTIES_NAMES.add(fullPropName);
                    });
                }
            }
        }

        classes[CLASS_NAME] = function(initState) {
            if (CLASS_IS_ABSTRACT) {
                throw new SyntaxError('Unable to construct new instance; ' + CLASS_NAME + ' is an abstract class');
            }

            var instance = this,
                instanceIsAttached = false;

            var localPropertiesMap = Utils.createCleanObject();

            var instancePropertyValues = Utils.createCleanObject(),
                instanceExposedDOMElems = Utils.createCleanObject(); // { "key": HTMLElement }

            var instanceAttributeValues = Utils.createCleanObject();
            var instanceAttributesInterface = Utils.createCleanObject();

            var instanceDom = Utils.cloneElemForInstantiation(CLASS_ROOT_ELEM),
                toProcess = [instanceDom],
                current,

                dispatchEventToParent = function(eventName, eventData) {
                    if (instanceDom.parentNode && instanceDom.parentNode[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED] && instanceDom.parentNode[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED][eventName]) {
                        instanceDom.parentNode[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED][eventName](eventData);
                    }
                };

            while (current = toProcess.shift()) {
                if (current instanceof Element) {

                    if (current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]) {
                        Object.keys(current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]).forEach(function(eventName) {
                            // Event object will be provided when called by browser
                            current['on' + eventName] = current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS][eventName].bind(instance, current, dispatchEventToParent);
                        });
                    }
                    if (current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]) {
                        Object.keys(current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]).forEach(function(eventName) {
                            // Event data will be provided when called by child OOML element
                            if (!current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED]) current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED] = Utils.createCleanObject();
                            current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED][eventName] = current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS][eventName].bind(instance, current, dispatchEventToParent);
                        });
                    }

                    var exposeKey = current.getAttribute('ooml-expose');
                    if (exposeKey) {
                        if (instanceExposedDOMElems[exposeKey]) {
                            throw new SyntaxError('A DOM element is already exposed with the key ' + exposeKey);
                        }
                        instanceExposedDOMElems[exposeKey] = current;
                        current.removeAttribute('ooml-expose');
                    }

                    Utils.pushAll(toProcess, current.attributes, current.childNodes);

                } else if (current instanceof Attr || current instanceof Text) {

                    if (current[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {

                        for (var propName in current[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
                            if (!localPropertiesMap[propName]) {
                                localPropertiesMap[propName] = [];
                            }
                            localPropertiesMap[propName].push(current);
                        }
                    }

                } else if (current instanceof Comment) {

                    if (current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG]) {

                        var config = current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG];
                        var commentNodeMarker = current;
                        if (config.isArray) {
                            instancePropertyValues[config.propName] = new OOML.Array(config.elemConstructor, commentNodeMarker);
                        } else {
                            localPropertiesMap[config.propName] = {
                                elemConstructor: config.elemConstructor,
                                insertAfter: commentNodeMarker
                            };
                        }
                    }

                }
            }

            var currentlyAttachedTo; // For public method .detach only; is not used to actually detach, it is used to call the parent object's method of detachment

            var propertiesGetterSetterFuncs = {};
            propertiesGetterSetterFuncs.attributes = {
                set: function (newObj) {
                    if (!Utils.isObjectLiteral(newObj)) {
                        throw new TypeError('New attributes object provided is not a valid object');
                    }

                    var newObjKeys = Object.keys(newObj);

                    // Don't combine checking if attribute exists and setting it,
                    // as that may result in a half-state where some attributes
                    // are set and some aren't
                    if (newObjKeys.some(function(propName) { return instanceAttributeValues[propName] === undefined })) {
                        throw new ReferenceError('New attributes object provided has an unrecognised attribute ' + propName);
                    }
                    newObjKeys.forEach(function(key) {
                        instanceAttributesInterface[key] = newObj[key];
                    });
                },
                get: function () {
                    return instanceAttributesInterface;
                },
            };
            propertiesGetterSetterFuncs.detach = {
                value: function() {
                    if (!instanceIsAttached) {
                        throw new Error('This instance is not in use');
                    }

                    var parent = currentlyAttachedTo.parent;
                    if (parent instanceof OOML.Array) {
                        var indexOfThis = parent.indexOf(this);
                        if (indexOfThis < 0) {
                            throw new Error('This instance could not be found on its parent array');
                        }
                        // This will call __oomlDetach
                        parent.splice(indexOfThis, 1);
                    } else if (parent instanceof OOML.Element) {
                        // This will update property to null
                        parent[OOML_ELEMENT_PROPNAME_DETACHOWNELEMPROPELEM](currentlyAttachedTo.property);
                    } else {
                        throw new Error('Unrecognised parent');
                    }

                    return this;
                },
            };
            propertiesGetterSetterFuncs[OOML_ELEMENT_PROPNAME_DETACHOWNELEMPROPELEM] = {
                value: function(propName) {
                    if (!CLASS_ELEM_PROPERTIES_NAMES.has(propName) || !this[propName]) {
                        throw new Error('The property value for ' + propName + ' is not an element');
                    }

                    // Don't go through setter, directly update the internal values object
                    instancePropertyValues[propName][OOML_ELEMENT_PROPNAME_DETACH]();
                    instancePropertyValues[propName] = null;
                }
            };
            propertiesGetterSetterFuncs[OOML_ELEMENT_PROPNAME_DOMELEM] = {
                value: instanceDom,
            };
            propertiesGetterSetterFuncs[OOML_ELEMENT_PROPNAME_ATTACH] = {
                value: function(settings) {
                    if (instanceIsAttached) {
                        throw new Error('This instance is already in use');
                    }

                    currentlyAttachedTo = {
                        parent: settings.parent,
                        property: settings.property,
                    };

                    if (settings.appendTo) {
                        settings.appendTo.appendChild(instanceDom);
                    } else if (settings.prependTo) {
                        settings.prependTo.insertBefore(instanceDom, settings.prependTo.childNodes[0] || null);
                    } else if (settings.insertBefore) {
                        settings.insertBefore.parentNode.insertBefore(instanceDom, settings.insertBefore);
                    } else if (settings.insertAfter) {
                        settings.insertAfter.parentNode.insertBefore(instanceDom, settings.insertAfter.nextSibling);
                    }

                    instanceIsAttached = true;
                },
            };
            propertiesGetterSetterFuncs[OOML_ELEMENT_PROPNAME_DETACH] = {
                value: function() {
                    if (!instanceIsAttached) {
                        throw new Error('This instance is not in use');
                    }

                    currentlyAttachedTo = undefined;

                    instanceDom.parentNode.removeChild(instanceDom);
                    instanceIsAttached = false;
                },
            };

            CLASS_PROPERTIES_NAMES.forEach(function(prop) {

                var setter;

                if (CLASS_ARRAY_PROPERTIES_NAMES.has(prop)) {
                    setter = function(newVal) {
                        if (!Array.isArray(newVal)) {
                            throw new TypeError('Non-array provided to element array substitution property');
                        }
                        instancePropertyValues[prop].initialize(newVal);
                    };
                } else if (CLASS_ELEM_PROPERTIES_NAMES.has(prop)) {
                    setter = function(newVal) {
                        if (newVal !== null && !Utils.isObjectLiteral(newVal) && !(newVal instanceof OOML.Element)) {
                            throw new TypeError('Invalid value provided to element property');
                        }

                        var elemDetails = localPropertiesMap[prop];

                        // Attach first to ensure that element is attachable
                        if (newVal != null) {
                            newVal = Utils.constructElement(elemDetails.elemConstructor, newVal);
                            newVal[OOML_ELEMENT_PROPNAME_ATTACH]({ insertAfter: elemDetails.insertAfter, parent: this, property: prop });
                        }

                        // Current element may not be OOML.Element (or may be null) and therefore may not need detaching
                        if (instancePropertyValues[prop] instanceof OOML.Element) {
                            instancePropertyValues[prop][OOML_ELEMENT_PROPNAME_DETACH]();
                        }

                        instancePropertyValues[prop] = newVal;
                    };
                } else {
                    setter = function(newVal) {
                        if (!Utils.isPrimitiveValue(newVal)) {
                            throw new TypeError('Cannot set new property value; unrecognised type');
                        }

                        if (CLASS_PROPERTIES_TYPES[prop]) {
                            if (!CLASS_PROPERTIES_TYPES[prop].some(function(type) { return Utils.isType(type, newVal) })) {
                                throw new TypeError('Cannot set new property value; expected type to be one of: ' + CLASS_PROPERTIES_TYPES[prop].join(', '));
                            }
                        }

                        if (localPropertiesMap[prop]) { // Some properties are unused in the DOM (e.g. predefined properties)
                            localPropertiesMap[prop].forEach(function(node) {
                                var formatStr = node[OOML_NODE_PROPNAME_TEXTFORMAT];
                                node[OOML_NODE_PROPNAME_FORMATPARAMMAP][prop].forEach(function(offset) {
                                    formatStr[offset] = newVal;
                                });
                                OOMLNodesWithUnwrittenChanges.add(node);
                            });

                            OOMLWriteChanges();
                        }

                        instancePropertyValues[prop] = newVal;
                    };
                }

                propertiesGetterSetterFuncs[prop] = {
                    get: function() {
                        return instancePropertyValues[prop];
                    },
                    set: setter,
                    enumerable: true,
                };
            });

            // Expose DOM elements via prefixed property
            Object.keys(instanceExposedDOMElems).forEach(function(keyName) {
                propertiesGetterSetterFuncs['$' + keyName] = {
                    value: instanceExposedDOMElems[keyName],
                };
            });

            // Apply getters and setters for local properties
            Object.defineProperties(this, propertiesGetterSetterFuncs);

            // Get all predefined attributes properties (including inherited ones)
            var ancestorClasses = [],
                currentProto = Object.getPrototypeOf(this);
            while (currentProto != OOML.Element.prototype) {
                ancestorClasses.unshift(currentProto.constructor);
                currentProto = Object.getPrototypeOf(currentProto);
            }

            // Apply predefined attributes and properties, starting with most ancient
            ancestorClasses.forEach(function(ancestorClass) {
                for (var attrName in ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDATTRS]) {
                    var attrValue = ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDATTRS][attrName];
                    Utils.DOM.setData(instanceDom, attrName, attrValue);
                    instanceAttributeValues[attrName] = attrValue;
                }

                for (var propName in ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDPROPS]) {
                    instance[propName] = ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDPROPS][propName];
                }
            });

            // Set up attributes object
            Object.keys(instanceAttributeValues).forEach(function (key) {
                Object.defineProperty(instanceAttributesInterface, key, {
                    get: function() {
                        return instanceAttributeValues[key];
                    },
                    set: function(newVal) {
                        if (!Utils.isPrimitiveValue(newVal)) {
                            throw new TypeError('The value for the attribute ' + key + ' is invalid');
                        }
                        instanceAttributeValues[key] = newVal;
                        Utils.DOM.setData(instanceDom, key, newVal);
                    },
                    enumerable: true,
                });
            });
            Object.preventExtensions(instanceAttributesInterface);

            var constructor = ancestorClasses.reduce(function(previous, ancestorClass) {
                if (ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR]) {
                    return ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR].bind(instance, previous);
                } else {
                    return previous;
                }
            }, undefined);
            if (constructor) { // If not a single ancestor class has a constructor, then this wouldn't be a function
                constructor();
            }

            // Apply given object argument to this new instance's properties
            // NOTE: .assign is available at this point, as instances are constructed AFTER classes are initialised (including prototypes)
            if (initState) {
                this.assign(initState);
            }

            // Remove any remaining parameter handlebars and set any undefined values
            // to the default type values
            CLASS_PROPERTIES_NAMES.forEach(function(propName) {
                if (instance[propName] === undefined) {
                    var types = CLASS_PROPERTIES_TYPES[propName] || ['null'];
                    if (~types.indexOf('null') || ~types.indexOf('Date')) {
                        instance[propName] = null;
                    } else if (~types.indexOf('Array')) {
                        instance[propName] = [];
                    } else if (~types.indexOf('natural') || ~types.indexOf('integer') || ~types.indexOf('float') || ~types.indexOf('number')) {
                        instance[propName] = 0;
                    } else if (~types.indexOf('boolean')) {
                        instance[propName] = false;
                    } else if (~types.indexOf('string')) {
                        instance[propName] = '';
                    } else {
                        throw new Error('Unknown type for property');
                    }
                }
            });
            // Update nodes with parameter handlebars (so they can be removed)
            OOMLWriteChanges();
        };

        // Set properties for accessing properties' names and predefined properties' values
        classes[CLASS_NAME][OOML_CLASS_PROPNAME_PROPNAMES] = CLASS_PROPERTIES_NAMES;
        classes[CLASS_NAME][OOML_CLASS_PROPNAME_PREDEFINEDATTRS] = CLASS_PREDEFINED_ATTRIBUTES_VALUES;
        classes[CLASS_NAME][OOML_CLASS_PROPNAME_PREDEFINEDPROPS] = CLASS_PREDEFINED_PROPERTIES_VALUES;
        classes[CLASS_NAME][OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR] = CLASS_PREDEFINED_CONSTRUCTOR;

        // Make class inherit from parent class
        classes[CLASS_NAME].prototype = Object.create(CLASS_PARENT_CLASS.prototype);
        classes[CLASS_NAME].prototype.constructor = classes[CLASS_NAME];

        // Set defined methods in class prototype
        for (var methodName in CLASS_PREDEFINED_METHODS_FUNCTIONS) {
            classes[CLASS_NAME].prototype[methodName] = CLASS_PREDEFINED_METHODS_FUNCTIONS[methodName];
        }
    });

    Utils.DOM.find(namespace, '[ooml-instantiate]').forEach(function(instanceInstantiationElem) {

        var instDetails  = instanceInstantiationElem.getAttribute('ooml-instantiate').split(' '),
            className    = instDetails[0],
            instanceName = instDetails[1];

        if (objects[instanceName]) {
            throw new SyntaxError('An object already exists with the name ' + instanceName);
        }

        var initState = Utils.getEvalValue(instanceInstantiationElem.textContent);
        var instance = new classes[className](initState);

        instanceInstantiationElem.parentNode.insertBefore(instance[OOML_ELEMENT_PROPNAME_DOMELEM], instanceInstantiationElem.nextSibling);

        // Copy attributes on instantiation element to new instance's root element
        Utils.concat(instanceInstantiationElem.attributes).forEach(function(attr) {
            if (attr.name != 'ooml-instantiate') {
                instance[OOML_ELEMENT_PROPNAME_DOMELEM].setAttribute(attr.name, attr.value);
            }
        });

        // Remove after attaching constructed elem
        instanceInstantiationElem.parentNode.removeChild(instanceInstantiationElem);

        objects[instanceName] = instance;
    });

    return {
        classes: classes,
        objects: objects,
    };
};
