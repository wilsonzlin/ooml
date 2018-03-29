OOMLInstanceProto[OOML_INSTANCE_PROPNAME_GET_PROPERTY] = function (prop) {
  let instance = this;
  let instanceProperty = instance[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT][prop];
  let classProperty = instance.constructor[OOML_CLASS_PROPNAME_PROPERTIES][prop];

  let currentValue = instanceProperty.currentValue;
  if (classProperty.getter) {
    return instance[classProperty.getter](currentValue, prop);
  }
  return currentValue;
};
