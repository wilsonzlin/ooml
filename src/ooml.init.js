OOML.Namespace = function(namespace, settings) {
    // For minifying, and to allow access from any scope
    let oomlNamespaceInstance = this;

    // Ensure `new` keyword was used
    if (!(oomlNamespaceInstance instanceof OOML.Namespace)) {
        throw new SyntaxError(`OOML.Namespace must be constructed`);
    }

    // Default to document.body as namespace
    if (namespace === undefined) {
        namespace = document.body;

    // Find element matching selector, or used provided HTML
    } else if (Utils.typeOf(namespace, TYPEOF_STRING)) {
        namespace = namespace.trim();

        // Determine if HTML by first non-whitespace character
        if (namespace[0] == '<') {
            let domParser = document.createElement('div');
            domParser.innerHTML = namespace;
            namespace = domParser;
        } else {
            namespace = document.querySelector(namespace);
        }

    // Otherwise, must provide an element
    } else if (!(namespace instanceof HTMLElement)) {
        throw new TypeError(`Invalid namespace`);
    }

    // Check that a namespace has not already been constructed by any ancestor or descendant
    if (Utils.DOM.hasAncestorOrDescendantNamespace(namespace)) {
        throw new ReferenceError(`That namespace already exists`);
    }
    // Mark this so future .hasAncestorOrDescendantNamespace checks can know this was used as a namespace
    namespace[OOML_DOM_PROPNAME_ISNAMESPACE] = true;

    // The `settings` variable is optional, but must be an object literal if provided
    if (settings === undefined) {
        settings = {};
    } else if (!Utils.isObjectLiteral(settings)) {
        throw new TypeError(`Invalid settings object`);
    }

    // Prepare an object to store imports; fill with global imports initially
    let imports = Utils.concat(OOMLGlobalImports);

    // Iterate settings object rather than directly accessing properties
    // to check for non-existent settings that have been provided
    Object.keys(settings).forEach(settingName => {
        let settingValue = settings[settingName];

        if (settingValue === undefined) {
            return;
        }

        switch (settingName) {
            case 'imports':
                // `imports` looks like `{ ImportName: Function OOML.Element, AnotherImportName: Function OOML.Element }`
                // Note that the import name does not have to be the actual name of the class
                if (!Utils.isObjectLiteral(settingValue)) {
                    throw new TypeError(`Invalid namespace imports`);
                }

                Object.keys(settingValue).forEach(importName => {
                    let importClass = settings.imports[importName];
                    // It must be an OOML class (obviously)
                    if (!Utils.isOOMLClass(importClass)) {
                        throw new TypeError(`The value for the import "${ importName }" is not an OOML class`);
                    }
                    imports[importName] = importClass;
                });

                break;

            default:
                throw new ReferenceError(`"${ settingName }" is not a setting`);
        }
    });

    // To hold parsed OOML classes
    let classes = Utils.createCleanObject();
    // To hold bootstrapped objects
    let objects = Utils.createCleanObject();

    // Go through the namespace and find any OOML class declarations
    Utils.DOM.find(namespace, 'template[ooml-class],template[ooml-abstract-class]').forEach(classTemplateElem => {

        /*
            This is a classMetadata:

                {
                    name: "NameOfClass",
                    isAbstract: true || false,
                    extends: "a string representing the unverified name of the class, not a fuction representing the actual class",

                    constructor: Function unbindedConstructor || undefined,
                    rootElem: HTMLElement,

                    properties: {
                        nameOfProp: {
                            types: ["string", "natural", "null"] || [SomeOOMLClassConstructor] || undefined,
                            value: "the default value" || undefined,
                            isArray: true || false,

                            getter: Function someOwnMethod || undefined,
                            setter: Function someOwnMethod || undefined,
                            onChange: Function someOwnMethod || undefined,

                            isSuppressed: false,
                            isAttribute: true,

                            bindingIsDynamic: true || false,
                            bindingParts: ["users.", "", ".age"] || undefined,
                            bindingPropertyToPartMap: {
                                "userID": [1],
                            } || undefined,
                            bindingKeypath: undefined || "fixed.path.to.store.value",
                            bindingOnExist: Function someOwnMethod || undefined,
                            bindingOnMissing: Function someOwnMethod || undefined,
                        },
                    },
                    methods: {
                        nameOfMethod: {
                            fn: Function realFn,
                        },
                    },
                }


        */
        let classMetadata = Utils.preprocessClassDeclaration(classTemplateElem);

        Utils.iterate(classMetadata.rootElem.attributes, attr => {
            if (/^data-/i.test(attr.name)) {
                throw new SyntaxError(`Data attributes are not allowed on the root element`);
            }
        });

        let className = classMetadata.name;
        if (classes[className]) {
            throw new ReferenceError(`The class "${ className }" already exists`);
        }

        let classIsAbstract = classMetadata.isAbstract;

        let classExtends = classMetadata.extends;
        if (classExtends) {
            classExtends = Utils.getClassFromString(imports, classes, classExtends);
        } else {
            classExtends = OOML.Element;
        }

        // Used for applying default values on construction and extending a child class's predefined properties
        let classPredefinedProperties = Utils.deepFreeze(Utils.concat(Utils.deepClone(classExtends[OOML_CLASS_PROPNAME_PREDEFINEDPROPS]) || Utils.createCleanObject(), classMetadata.properties));

        // Will be frozen later
        let classProperties = Utils.deepClone(classPredefinedProperties);

        // Just for quick reference, nothing more
        let classArrayProperties = new StringSet();
        let classElementProperties = new StringSet();
        let classSubstitutionDefaultValues = Utils.createCleanObject();

        // For .toObject and .keys
        let classSuppressedProperties = new StringSet();

        Object.keys(classProperties).forEach(propName => {
            if (classProperties[propName].suppressed) {
                classSuppressedProperties.add(propName);
            }
        });

        let classMethods = classMetadata.methods;

        let classConstructor = classMetadata.constructor;

        let classHasExtensionPoint;

        let classRawDom = classMetadata.rootElem;
        if (classExtends[OOML_CLASS_PROPNAME_EXTENSIONPOINT]) {
            let parentClassRawDom = classExtends[OOML_CLASS_PROPNAME_EXTENSIONPOINT];
            let _extendedRawDom = parentClassRawDom.cloneNode(true);
            let extensionPoint = _extendedRawDom.querySelector('ooml-extension-point');
            if (!extensionPoint) {
                throw new Error(`Extension point element node not found on parent class`);
            }
            extensionPoint.parentNode.replaceChild(classRawDom, extensionPoint);
            classRawDom = _extendedRawDom;
        }

        let classRootElem = Utils.parseClassDom(classRawDom);

        Utils.deepFreeze(classProperties);
        let classPropertyNames = Object.freeze(Object.keys(classProperties));

        classes[className] = function(initState) {
            let instance = this;
            let instanceIsAttachedTo = {};

            if (!(instance instanceof classes[className])) {
                throw new ReferenceError(`OOML instances need to be constructed`);
            }

            if (initState !== undefined && !Utils.isObjectLiteral(initState)) {
                if (!Utils.typeOf(instance.unserialise, TYPEOF_FUNCTION) || !Utils.isPrimitiveValue(initState)) {
                    throw new TypeError(`Invalid OOML instance initial state`);
                }

                initState = instance.unserialise(initState);
                if (!Utils.isObjectLiteral(initState)) {
                    throw new TypeError(`Unserialised initial state is not an object`);
                }
            }

            if (classIsAbstract) {
                if (!Utils.typeOf(instance.abstractFactory, TYPEOF_FUNCTION)) {
                    throw new TypeError(`Unable to construct new instance; "${ classMetadata.name }" is an abstract class`);
                }

                let ret = instance.abstractFactory(initState);
                if (!(ret instanceof OOML.Element)) {
                    throw new TypeError(`Abstract factory returned value is not an OOML instance`);
                }

                return ret;
            }

            let instanceProperties = Utils.deepClone(classProperties);
            Object.keys(instanceProperties).forEach(propertyName => {
                instanceProperties[propertyName].insertAfter = undefined;
                instanceProperties[propertyName].nodes = new NodeSet(); // Use NodeSet as attributes may be binded to the same property more than once
            });

            // Map from property names to properties and attributes that have a dynamic binding dependent on it
            let propertiesToDependentBindings = Utils.createCleanObject();
            // Map from attribute names to properties and attributes that have a dynamic binding dependent on it
            // TODO Remove attributes
            let propertyRebindSetTimeouts = Utils.createCleanObject();
            function rebindDynamicBinding(property) {

                clearTimeout(propertyRebindSetTimeouts[property]);

                propertyRebindSetTimeouts[property] = setTimeout(() => {
                    let internalObject = instanceProperties[property];
                    let currentBindingId = internalObject.bindingId;

                    if (internalObject.bindingIsDynamic) {
                        internalObject.bindingKeypath = internalObject.bindingParts.join("");
                    }

                    if (currentBindingId != undefined) {
                        hive.unbind(currentBindingId);
                    }

                    internalObject.bindingId = hive.bind(internalObject.bindingKeypath, instance, property);
                }, 50);
            }


            let instanceEventHandlers = {
                mutation: Utils.createCleanObject(),
                dispatch: Utils.createCleanObject(),
            };

            let instanceExposedDOMElems = Utils.createCleanObject(); // { "key": HTMLElement }
            let instanceDom = Utils.processClassDom(classRootElem);

            let instanceObjectProperties = Utils.createCleanObject();
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_DOMELEM] = instanceDom;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH] = instanceEventHandlers.dispatch;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION] = instanceEventHandlers.mutation;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT] = instanceIsAttachedTo;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT] = instanceProperties;

            // Expose DOM elements via prefixed property
            Object.keys(instanceExposedDOMElems).forEach(keyName => {
                instanceObjectProperties['$' + keyName] = instanceExposedDOMElems[keyName];
            });

            // Apply getters and setters for local properties
            for (let p in instanceObjectProperties) {
                Object.defineProperty(instance, p, { value: instanceObjectProperties });
            }
            Object.preventExtensions(instance);

            if (initState) {
                Object.keys(initState).forEach(propName => {
                    if (classPropertyNames.indexOf(propName) < 0) {
                        throw new ReferenceError(`The property "${propName}" provided in an element substitution's default value does not exist`);
                    }
                });
            }

            classPropertyNames.forEach(propName => {
                if (Utils.hasOwnProperty(initState, propName)) {
                    // If passthrough, initialise instance with initState built-in (to prevent it counting as a change, and to increase efficiency)
                    if (classProperties[propName].passthrough != undefined) {
                        let initStateUnserialised = Utils.createCleanObject();
                        initStateUnserialised[classProperties[propName].passthrough] = initState[propName];
                        if (Utils.hasOwnProperty(classSubstitutionDefaultValues, propName)) {
                            // WARNING: Unknown if should clone classSubstitutionDefaultValues value first
                            instance[propName] = Utils.concat(classSubstitutionDefaultValues[propName], initStateUnserialised);
                        } else {
                            instance[propName] = initStateUnserialised;
                        }
                    } else {
                        instance[propName] = initState[propName];
                    }
                } else if (Utils.hasOwnProperty(classSubstitutionDefaultValues, propName)) {
                    // WARNING: Unknown if should clone first
                    instance[propName] = classSubstitutionDefaultValues[propName];
                } else if (Utils.hasOwnProperty(classPredefinedProperties, propName)) {
                    instance[propName] = classPredefinedProperties[propName].value;
                } else if (instance[propName] === undefined) { // WARNING: Must check as array substitution properties have value already set
                    // Set any undefined values to their default type values
                    let types = instanceProperties[propName].types;

                    if (classElementProperties.has(propName)) {
                        instance[propName] = classProperties[propName].passthrough != undefined ? {} : null;
                    } else {
                        instance[propName] = Utils.getDefaultPrimitiveValueForTypes(types);
                    }
                }
            });

            // Get all predefined attributes properties (including inherited ones)
            let ancestorClasses = [];
            let currentProto = Object.getPrototypeOf(this);

            while (currentProto !== OOML.Element.prototype) {
                ancestorClasses.unshift(currentProto.constructor);
                currentProto = Object.getPrototypeOf(currentProto);
            }

            let builtConstructor = ancestorClasses.reduce((previous, ancestorClass) => {
                return ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR] ? ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR].bind(instance, previous) : previous;
            }, undefined);
            if (builtConstructor) {
                builtConstructor();
            }

            // Update attribute nodes with parameter handlebars that have just been changed
            OOMLWriteChanges();
        };

        // Set properties for accessing properties' names and predefined properties' values
        classes[className][OOML_CLASS_PROPNAME_PROPNAMES] = classPropertyNames; // Already frozen
        classes[className][OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES] = classSuppressedProperties;
        classes[className][OOML_CLASS_PROPNAME_PREDEFINEDPROPS] = classPredefinedProperties; // Already frozen
        classes[className][OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR] = classConstructor;
        classes[className][OOML_CLASS_PROPNAME_EXTENSIONPOINT] = classHasExtensionPoint && classRawDom;
        classes[className][OOML_CLASS_PROPNAME_ROOTELEMTAGNAME] = classRootElem && classRootElem.name;
        Object.defineProperty(classes[className], "name", { value: className });

        // Make class inherit from parent class
        classes[className].prototype = Object.create(classExtends.prototype);
        let classProtoPropertiesConfig = Utils.createCleanObject();

        classProtoPropertiesConfig.constructor = { value: classes[className] };
        // Do this to allow instance methods access to this namespace's classes
        classProtoPropertiesConfig.namespace = { value: oomlNamespaceInstance };

        classPropertyNames.forEach(prop => {

            let setter;

            if (classArrayProperties.has(prop)) {

                // Element array substitution
                setter = function(newVal) {
                    this[OOML_INSTANCE_PROPNAME_SET_ARRAY_PROPERTY](prop, newVal);
                };

            } else if (classElementProperties.has(prop)) {

                // Element substitution
                setter = function(newVal) {
                    this[OOML_INSTANCE_PROPNAME_SET_OBJECT_PROPERTY](prop, newVal);
                };

            } else {
                // TODO Cleanup
                // Set up the binding if it has one
                let bindingConfig = instanceProperties[prop].binding;
                if (bindingConfig) {
                    instanceProperties[prop].bindingState = BINDING_STATE_INIT;
                    if (bindingConfig.isDynamic) {
                        let propertyToPartMap = bindingConfig.propertyToPartMap;
                        Object.keys(propertyToPartMap).forEach(k => {
                            if (k != "attributes") {
                                if (!propertiesToDependentBindings[k]) {
                                    propertiesToDependentBindings[k] = {
                                        attributes: new StringSet(),
                                        properties: new StringSet(),
                                    };
                                }
                                propertiesToDependentBindings[k].properties.add(prop);
                            }
                        });
                    } else {
                        rebindDynamicBinding(prop);
                    }
                }

                setter = function(newValue) {
                    // .bind is more expensive than closure
                    // Also, .bind would prevent "this" value from being auto applied
                    return this[OOML_INSTANCE_PROPNAME_SET_PRIMITIVE_PROPERTY](prop, newValue);
                };

            }

            classProtoPropertiesConfig[prop] = {
                get: function() {
                    return this[OOML_INSTANCE_PROPNAME_GET_PROPERTY](prop);
                },
                set: setter,
                // Don't make enumerable, as this is on prototype, so not enumerable anyway
            };
        });

        // Set defined methods in class prototype
        for (let methodName in classMethods) {
            classProtoPropertiesConfig[methodName] = { value: classMethods[methodName].fn };
        }

        Object.defineProperties(classes[className].prototype, classProtoPropertiesConfig);
    });

    Object.freeze(classes);

    Utils.DOM.find(namespace, '[ooml-instantiate]').forEach(instanceInstantiationElem => {

        let instDetails  = instanceInstantiationElem.getAttribute('ooml-instantiate').split(' '),
            className    = instDetails[0],
            instanceName = instDetails[1];

        if (objects[instanceName]) {
            throw new ReferenceError(`An object already exists with the name "${ instanceName }"`);
        }

        let initState = Utils.getEvalValue(instanceInstantiationElem.textContent);
        let constructor = classes[className];
        if (!constructor) {
            throw new ReferenceError(`Unknown class "${ className }"`);
        }

        let classRootElemTagName = constructor[OOML_CLASS_PROPNAME_ROOTELEMTAGNAME];
        let instantiateElemTagName = instanceInstantiationElem.nodeName.toLocaleLowerCase();
        if (classRootElemTagName !== instantiateElemTagName) {
            throw new ReferenceError(`Instantiating class "${ className }" requires tag "${ classRootElemTagName }", got "${ instantiateElemTagName }"`);
        }
        let instance = new constructor(initState);

        instanceInstantiationElem.parentNode.insertBefore(instance[OOML_INSTANCE_PROPNAME_DOMELEM], instanceInstantiationElem.nextSibling);

        // Copy attributes on instantiation element to new instance's root element
        Utils.iterate(instanceInstantiationElem.attributes, attr => {
            let _attrName = attr.name.toLocaleLowerCase();
            if (_attrName != 'ooml-instantiate') {
                if (/^(data-|(mutation|dispatch|dom)?on)/.test(_attrName)) {
                    throw new SyntaxError(`Illegal attribute "${ _attrName }" on ooml-instantiate element`);
                }
                instance[OOML_INSTANCE_PROPNAME_DOMELEM].setAttribute(_attrName, attr.value);
            }
        });

        // Remove after attaching constructed elem
        instanceInstantiationElem.parentNode.removeChild(instanceInstantiationElem);

        objects[instanceName] = instance;
    });

    this.classes = classes;
    this.objects = objects;

    Object.freeze(this);
};
