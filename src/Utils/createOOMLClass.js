Utils.createOOMLClass = ({ namespace, className, classParent, classMethods, classConstructor, classIsAbstract, classProperties, classRootElem }) => {
    let oomlClass;

    let classPropertyNames = Object.freeze(Object.keys(classProperties));

    // Create a simpler class if it's abstract
    if (classIsAbstract) {
        oomlClass = function(initState) {
            let instance = this;

            if (!(instance instanceof oomlClass)) {
                throw new ReferenceError(`OOML instances need to be constructed`);
            }

            initState = Utils.unserialiseInitState(instance, initState);

            if (!Utils.typeOf(instance.abstractFactory, TYPEOF_FUNCTION)) {
                throw new TypeError(`Unable to construct new instance; "${ className }" is an abstract class`);
            }

            let ret = instance.abstractFactory(initState);
            if (!(ret instanceof OOML.Element)) {
                throw new TypeError(`Abstract factory returned a value that is not an OOML element instance`);
            }

            return ret;
        };

    // Create a normal non-abstract class
    } else {
        oomlClass = function(initState) {
            let instance = this;
            let instanceIsAttachedTo = {};

            if (!(instance instanceof oomlClass)) {
                throw new ReferenceError(`OOML instances need to be constructed`);
            }

            initState = Utils.unserialiseInitState(instance, initState);

            // Create a copy of the classProperties to use as this instance's internal state
            let instanceProperties = Utils.deepClone(classProperties);

            // Defensive coding
            Object.preventExtensions(instanceProperties);

            // Set up the instanceProperties internal object
            Object.keys(instanceProperties).forEach(propertyName => {
                // For element and array substitutions, so that the anchor position is known
                instanceProperties[propertyName].insertAfter = undefined;

                // Use NodeSet as attributes may be binded to the same property more than once
                instanceProperties[propertyName].nodes = new NodeSet();

                // Defensive coding
                Object.preventExtensions(instanceProperties[propertyName]);
            });

            // Map from property names to properties that have a dynamic binding dependent on it
            let propertiesToDependentBindings = Utils.createCleanObject();
            let propertyRebindSetTimeouts = Utils.createCleanObject();

            let dispatchEventHandlers = Utils.createCleanObject();
            let mutationEventHandlers = Utils.createCleanObject();

            let instanceExposedDOMElems = Utils.createCleanObject(); // { "key": HTMLElement }
            let instanceDom = Utils.constructInstanceDomFromShape({
                instance, instanceProperties, instanceExposedDOMElems,
                node: classRootElem
            });

            let instanceObjectProperties = Utils.createCleanObject();
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_DOMELEM]                       = instanceDom;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH]       = dispatchEventHandlers;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION]       = mutationEventHandlers;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT]            = instanceIsAttachedTo;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT]    = instanceProperties;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_PROPERTIES_TO_DEPENDENT_BINDINGS]  = propertiesToDependentBindings;
            instanceObjectProperties[OOML_INSTANCE_PROPNAME_PROPERTY_REBIND_SET_TIMEOUTS]  = propertyRebindSetTimeouts;

            // Expose DOM elements via prefixed property
            Object.keys(instanceExposedDOMElems).forEach(keyName => {
                instanceObjectProperties['$' + keyName] = instanceExposedDOMElems[keyName];
            });

            // Apply getters and setters for local properties
            for (let p in instanceObjectProperties) {
                Object.defineProperty(instance, p, { value: instanceObjectProperties });
            }

            // Prevent assigning to non-existent properties
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

            let builtConstructor = ancestorClasses.reduce((previous, ancestorClass) => {
                return ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR] ? ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR].bind(instance, previous) : previous;
            }, undefined);
            if (builtConstructor) {
                builtConstructor();
            }

            // Update attribute nodes with parameter handlebars that have just been changed
            OOMLWriteChanges();
        };
    }

    // Set properties for accessing properties' names and predefined properties' values
    oomlClass[OOML_CLASS_PROPNAME_PROPNAMES] = classPropertyNames; // Already frozen
    oomlClass[OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES] = classSuppressedProperties;
    oomlClass[OOML_CLASS_PROPNAME_PREDEFINEDPROPS] = classPredefinedProperties; // Already frozen
    oomlClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR] = classConstructor;
    oomlClass[OOML_CLASS_PROPNAME_EXTENSIONPOINT] = classHasExtensionPoint && classRawDom;
    oomlClass[OOML_CLASS_PROPNAME_ROOTELEMTAGNAME] = classRootElem && classRootElem.name;

    // Get all predefined attributes properties (including inherited ones)
    let ancestorClasses = [];
    let currentProto = Object.getPrototypeOf(this);

    while (currentProto !== OOML.Element.prototype) {
        ancestorClasses.unshift(currentProto.constructor);
        currentProto = Object.getPrototypeOf(currentProto);
    }
    oomlClass[OOML_CLASS_PROPNAME_ANCESTOR_CLASSES] = ancestorClasses;

    Object.defineProperty(oomlClass, "name", { value: className });

    // Make class inherit from parent class
    oomlClass.prototype = Object.create(classParent.prototype);
    let classProtoPropertiesConfig = Utils.createCleanObject();

    classProtoPropertiesConfig.constructor = { value: oomlClass };
    // Do this to allow instance methods access to this namespace's classes
    classProtoPropertiesConfig.namespace = { value: namespace };

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
                                propertiesToDependentBindings[k] = new StringSet();
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

    Object.defineProperties(oomlClass.prototype, classProtoPropertiesConfig);

    return oomlClass;
};
