let Utils_createOOMLClass = config => {
  let oomlClass;
  let namespace = config.namespace;
  let classMetadata = config.classMetadata;

  // **************************************
  // DESTRUCTURING FROM classMetadata START
  // **************************************

  let className = classMetadata.name;
  let classIsAbstract = classMetadata.isAbstract;
  let classParent = classMetadata.parent;
  let classConstructor = classMetadata.constructor;
  let classViewShape = classMetadata.viewShape;
  let classViewShapePathToExtensionPoint = classMetadata.viewShapePathToExtensionPoint;
  let classExposeKeys = classMetadata.exposeKeys;

  let classProperties = classMetadata.properties;
  let classMethods = classMetadata.methods;

  // ************************************
  // DESTRUCTURING FROM classMetadata END
  // ************************************

  let classPropertiesToDependentBindings = Utils_createCleanObject();
  let classPropertiesThatNeedInitialBinding = [];
  let classPropertyNames = new StringSet(Object.keys(classProperties));

  classPropertyNames.forEach(propName => {
    let classPropertyObject = classProperties[propName];

    let bindingIsDynamic = classPropertyObject.bindingIsDynamic;
    if (bindingIsDynamic != undefined) {
      if (bindingIsDynamic) {
        // Associate this binding's dependent properties to this property
        Object.keys(classPropertyObject.bindingPropertyToPartMap)
          .forEach(dependencyPropertyName => {
            if (!classPropertiesToDependentBindings[dependencyPropertyName]) {
              classPropertiesToDependentBindings[dependencyPropertyName] = [];
            }
            classPropertiesToDependentBindings[dependencyPropertyName].push(propName);
          });
      } else {
        // Non-dynamic bindings need to be bound when instance is contructed
        // Dynamic bindings don't need to, because the initial setting of property values will cause rebind
        classPropertiesThatNeedInitialBinding.push(propName);
      }
    }
  });

  if (classIsAbstract) {
    // Create a simpler class if it's abstract
    oomlClass = function (initState) {
      let instance = this;

      // Must use `new` keyword
      if (!(instance instanceof oomlClass)) {
        throw ReferenceError(`OOML instances need to be constructed`);
      }

      // If no abstract factory available, throw error
      if (!Utils_typeOf(instance.abstractFactory, TYPEOF_FUNCTION)) {
        throw TypeError(`Unable to construct new instance; "${ className }" is an abstract class`);
      }

      // Unserialise initState
      initState = Utils_unserialiseInitState(instance, initState);

      // Call abstract factory and assert it returned an OOML instance
      let ret = instance.abstractFactory(initState);
      if (!(ret instanceof OOML.Instance)) {
        throw TypeError(`Abstract factory returned a value that is not an OOML element instance`);
      }

      // Return the factory-built instance
      return ret;
    };

  } else {
    // Create a normal non-abstract class
    oomlClass = function (initState) {
      // Map from property names to an array of properties that have a dynamic binding dependent on it
      let propertyRebindSetTimeouts = Utils_createCleanObject();

      classPropertyNames.forEach(propName => {
        let classPropertyObject = classProperties[propName];

        let instancePropertyObject = {
          // Initially, the internal value should be undefined
          currentValue: undefined,
        };

        let bindingIsDynamic = classPropertyObject.bindingIsDynamic;
        if (bindingIsDynamic != undefined) {
          instancePropertyObject.bindingId = undefined;
          instancePropertyObject.bindingState = BINDING_STATE_INIT;

          if (bindingIsDynamic) {
            instancePropertyObject.bindingParts = classPropertyObject.bindingParts.slice();
          }
        }
      });

      classPropertiesThatNeedInitialBinding.forEach(propName => {
        // This is safe to do here, as it is async
        // This needs to be done at the end, after properties (that this function depends on) have been defined
        instance[OOML_INSTANCE_PROPNAME_REBIND_BINDING](propName);
      });
    };
  }

  oomlClass[OOML_CLASS_PROPNAME_VIEW_SHAPE] = classViewShapePathToExtensionPoint && classViewShape;
  oomlClass[OOML_CLASS_PROPNAME_EXTENSIONPOINT_PATH] = classViewShapePathToExtensionPoint;
  oomlClass[OOML_CLASS_PROPNAME_ROOTELEMTAGNAME] = classViewShape && classViewShape.name;
  oomlClass[OOML_CLASS_PROPNAME_PROPERTIES_TO_DEPENDENT_BINDINGS] = classPropertiesToDependentBindings;

  return oomlClass;
};
