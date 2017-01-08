OOML.Namespace = function(namespace, settings) {

    if (!(this instanceof OOML.Namespace)) {
        throw new SyntaxError('OOML.Namespace must be constructed');
    }

    namespace = namespace || document.body;

    if (typeof namespace == 'string') {
        namespace = namespace.trim();
        if (namespace[0] == '<') {
            let domParser = document.createElement('div');
            domParser.innerHTML = namespace;
            namespace = domParser;
        } else {
            namespace = document.querySelector(namespace);
        }
    }

    if (Utils.DOM.hasAncestorNamespace(namespace)) {
        throw new ReferenceError('That namespace already exists');
    }

    namespace[OOML_DOM_PROPNAME_ISNAMESPACE] = true;

    settings = Utils.concat({
        imports: Utils.createCleanObject(),
        strictPropertyNames: true,
    }, settings);

    let imports = Utils.concat(OOMLGlobalImports);
    Object.keys(settings.imports).forEach(importName => {
        let importClass = settings.imports[importName];
        if (!Utils.isOOMLClass(importClass)) {
            throw new TypeError(`The value for the import "${ importName }" is not an OOML class`);
        }
        imports[importName] = importClass;
    });

    let classes = Utils.createCleanObject();
    let objects = Utils.createCleanObject();

    function getClassFromString(className) {
        if (classes[className]) {
            return classes[className];
        }

        let ret = imports[className];

        if (!Utils.isOOMLClass(ret)) {
            throw new TypeError(`The class "${ className }" does not exist`);
        }

        return ret;
    }

    Utils.DOM.find(namespace, 'template[ooml-class], template[ooml-abstract-class]').forEach(function(classTemplateElem) {

        let classMetadata = Utils.preprocessClassDeclaration(classTemplateElem, settings.strictPropertyNames);
        let className = classMetadata.name;
        if (classes[className]) {
            throw new SyntaxError(`The class "${ className }" already exists`);
        }

        let classExtends = classMetadata.extends;
        if (classExtends) {
            classExtends = getClassFromString(classExtends);
        } else {
            classExtends = OOML.Element;
        }

        // var PROCESS_PROPERTY_DECLARATION = function(types, name) {
        //     if (!Utils.isValidPropertyName(name, SETTING_STRICT_PROPERTY_NAMES)) {
        //         throw new SyntaxError('Invalid property declaration; name `' + name + '` is invalid');
        //     }
        //     if (types !== null) {
        //         if (CLASS_PROPERTIES_TYPES[name]) {
        //             if (CLASS_PROPERTIES_TYPES[name].join('|') !== types) {
        //                 throw new SyntaxError('Types for the property ' + name + ' have already been declared');
        //             }
        //         } else {
        //             CLASS_PROPERTIES_TYPES[name] = types.split('|').filter(function (type, idx, types) {
        //                 if (OOML_PROPERTY_TYPE_DECLARATIONS.indexOf(type) == -1) {
        //                     throw new SyntaxError('Invalid type declaration `' + type + '` for property ' + name);
        //                 }
        //                 if (types.indexOf(type) !== idx) {
        //                     throw new SyntaxError('Duplicate type `' + type + '` in type declaration for property ' + name);
        //                 }
        //                 return true;
        //             });
        //         }
        //     }
        // };

        let toProcess = [classMetadata.rootElem];
        let current;

        while (current = toProcess.shift()) {

            if (current instanceof Element) {

                // Concat to prevent indexes from changing when removing inline event handler attributes
                Utils.concat(current.attributes).forEach(function(attr) {

                    if (attr.name.indexOf('childon') === 0) {

                        let eventName = attr.name.slice(7);

                        if (!current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]) {
                            current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS] = Utils.createCleanObject();
                        } else if (current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS][eventName]) {
                            throw new SyntaxError(`Another child "${ eventName }" event handler already exists`);
                        }

                        current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS][eventName] = Function('$self', 'dispatch', 'data', attr.value.trim());
                        current.removeAttributeNode(attr);

                    } else if (attr.name.indexOf('domon') === 0) {

                        let eventName = attr.name.slice(5);

                        if (!current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]) {
                            current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS] = Utils.createCleanObject();
                        } else if (current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS][eventName]) {
                            throw new SyntaxError(`Another DOM "${ eventName }" event handler already exists`);
                        }

                        current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS][eventName] = Function('$self', 'dispatch', 'event', 'event.preventDefault();' + attr.value.trim());
                        current.removeAttributeNode(attr);

                    } else if (attr.name.indexOf('on') === 0) {

                        throw new SyntaxError('Native DOM event handlers are not allowed');

                    } else {

                        toProcess.push(attr);

                    }
                });

                Utils.pushAll(toProcess, current.childNodes);

            } else if (current instanceof Text) {

                let currentNode = current;
                let indexOfOpeningBrace;

                while ((indexOfOpeningBrace = currentNode.nodeValue.indexOf('{')) > -1) {
                    // .splitText returns the new Text node that contains the REMAINING TEXT AFTER
                    currentNode = currentNode.splitText(indexOfOpeningBrace);
                    let nodeValue = currentNode.nodeValue;

                    // currentNode.nodeValue is now one of:
                    // "{{ this.propName }}"
                    // "{ for ClassName of this.propName }"
                    // "{ ClassName this.propName }"
                    // Therefore the index of the closing brace can't be less than 3
                    let indexOfClosingBrace = nodeValue.indexOf('}');
                    if (indexOfClosingBrace < 3) {
                        throw new SyntaxError('Matching closing brace not found');
                    }
                    // Remove first opening and all closing braces:
                    // "{{ this.propName }}"         becomes "{ this.propName "
                    // "{ ClassName this.propName }" becomes " ClassName this.propName "
                    let code = nodeValue.slice(1, indexOfClosingBrace);

                    let regexpMatches;
                    if (code[0] == '{') {
                        // NOTE: There is some repetition of the following logic
                        //       and logic in PROCESS_PROPERTY_DECLARATION
                        regexpMatches = /^\{(?: ((?:(?:[a-zA-Z]+)\|)*[a-zA-Z]+))? this\.(.+?) $/.exec(code);
                        if (!regexpMatches || !regexpMatches[2]) {
                            throw new SyntaxError(`Invalid property declaration at "${ code }"`);
                        }

                        let propName = regexpMatches[2];

                        if (!Utils.isValidPropertyName(propName, settings.strictPropertyNames)) {
                            throw new SyntaxError(`"${ propName }" is not a valid property name`);
                        }

                        let types = regexpMatches[1] || undefined;
                        if (types) {
                            if (classMetadata.properties[propName].types) {
                                if (classMetadata.properties[propName].types.join('|') !== types) {
                                    throw new SyntaxError(`The types for the property "${ propName }" have already been declared`);
                                }
                            }
                            types = types.split('|').filter((type, idx, types) => {
                                if (OOML_PROPERTY_TYPE_DECLARATIONS.indexOf(type) == -1) {
                                    throw new SyntaxError(`Invalid type declaration "${ type }" for property "${ propName }"`);
                                }
                                if (types.indexOf(type) !== idx) {
                                    throw new SyntaxError(`Duplicate type "${ type }" in type declaration for property "${ propName }"`);
                                }
                                return true;
                            });
                        }

                        if (!classMetadata.properties[propName]) {
                            classMetadata.properties[propName] = {
                                types: types,
                                value: undefined,
                            };
                        }

                        let textSubstitutionNode = currentNode;
                        currentNode = currentNode.splitText(indexOfClosingBrace + 2);

                        textSubstitutionNode[OOML_NODE_PROPNAME_TEXTFORMAT] = [''];
                        textSubstitutionNode[OOML_NODE_PROPNAME_FORMATPARAMMAP] = Utils.createCleanObject();
                        textSubstitutionNode[OOML_NODE_PROPNAME_FORMATPARAMMAP][propName] = [0];

                    } else {
                        regexpMatches = /^ (?:for ((?:[a-zA-Z]+\.)*(?:[a-zA-Z]+)) of|((?:[a-zA-Z]+\.)*(?:[a-zA-Z]+))) this\.([a-zA-Z0-9_]+) $/.exec(code);
                        if (!regexpMatches || !regexpMatches[3] || (!regexpMatches[1] && !regexpMatches[2])) {
                            throw new SyntaxError(`Invalid element substitution at "${ code }"`);
                        }

                        let toRemove = currentNode;
                        let elemSubstitutionCommentNode = document.createComment('');
                        currentNode = currentNode.splitText(indexOfClosingBrace + 1);
                        currentNode.parentNode.replaceChild(elemSubstitutionCommentNode, toRemove);

                        let elemConstructorName = regexpMatches[1] || regexpMatches[2];
                        let propName = regexpMatches[3];
                        let isArraySubstitution = !!regexpMatches[1];

                        // The property can be predefined but not already in use
                        // NOTE: It's not possible for more than one element substitution of the same property
                        // NOTE: Predefined properties always have a non-undefined value,
                        //       and other properties always have their value to be undefined
                        if (classMetadata.properties[propName] && classMetadata.properties[propName].value === undefined) {
                            throw new SyntaxError(`The property "${ propName }" is already defined`);
                        }

                        let elemConstructor =
                            elemConstructorName == 'HTMLElement' ? HTMLElement :
                                elemConstructorName == 'OOML.Element' ? OOML.Element :
                                    getClassFromString(elemConstructorName);

                        classMetadata.properties[propName] = {
                            types: [elemConstructor],
                            isArray: isArraySubstitution,
                            value: undefined,
                        };

                        elemSubstitutionCommentNode[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG] = propName;
                    }
                }

            } else if (current instanceof Attr) {

                let nodeValue = current.nodeValue;

                if (nodeValue.indexOf('{{') > -1) {
                    let paramsData = Utils.splitStringByParamholders(nodeValue);
                    current[OOML_NODE_PROPNAME_TEXTFORMAT] = paramsData.parts;
                    current[OOML_NODE_PROPNAME_FORMATPARAMMAP] = paramsData.map;

                    Object.keys(paramsData.map).forEach(function(propName) { // Use Object.keys to avoid scope issues
                        if (!classMetadata.properties[propName]) {
                            classMetadata.properties[propName] = {
                                types: undefined,
                                value: undefined,
                            };
                        }
                    });
                }
            }
        }

        classes[className] = function(initState) {
            if (classMetadata.isAbstract) {
                throw new SyntaxError(`Unable to construct new instance; "${ classMetadata.name }" is an abstract class`);
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
