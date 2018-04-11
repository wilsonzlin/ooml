OOMLInstanceProto[OOML_INSTANCE_PROPNAME_SET_OBJECT_PROPERTY] = function (prop, newVal) {
  // Let constructors handle newVal's type
  if (newVal === undefined) {
    throw TypeError(`Undefined provided as element substitution property value for "${prop}"`);
  }
  let instance = this;
  let instanceProperty = instance[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT][prop];
  let classProperty = instance.constructor[OOML_CLASS_PROPNAME_PROPERTIES][prop];

  // This setter could be called WHILE property value is being normalised (i.e. set to not undefined)
  let currentValue = instanceProperty.currentValue;
  let currentlyInitialised = currentValue != undefined;

  if (classProperty.setter) {
    let setterReturnVal = instance[classProperty.setter](newVal, currentValue, prop);
    if (setterReturnVal === false) {
      return;
    }

    if (setterReturnVal !== undefined) {
      if (!Utils_isObjectLiteral(setterReturnVal)) {
        throw TypeError(`Invalid setter return value`);
      }

      if (Utils_hasOwnProperty(setterReturnVal, "value")) {
        newVal = setterReturnVal.value;
      }
    }
  }

  if (classProperty.passthroughProperty != undefined && currentlyInitialised) {
    currentValue[classProperty.passthroughProperty] = newVal;
    return;
  }

  // Attach first to ensure that element is attachable
  if (newVal !== null) {
    newVal = Utils_constructOOMLInstance(classProperty.types, newVal);
    newVal[OOML_INSTANCE_PROPNAME_ATTACH]({
      insertAfter: instanceProperty.insertAfter,
      parent: instance,
      property: prop
    });
  }

  // Current element may be null and therefore does not need detaching
  if (currentlyInitialised) {
    currentValue[OOML_INSTANCE_PROPNAME_DETACH]();
  }

  instanceProperty.currentValue = newVal;
};
