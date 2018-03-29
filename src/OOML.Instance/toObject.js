OOMLInstanceProto.toObject = function () {

  let instance = this;
  let obj = Utils.createCleanObject();

  let classProperties = instance.constructor[OOML_CLASS_PROPNAME_PROPERTIES];
  let classPropertyNames = instance.constructor[OOML_CLASS_PROPNAME_PROPNAMES];

  classPropertyNames.forEach(propName => {
    if (classProperties[propName].isTransient) {
      return;
    }

    let value = instance[propName];
    // Use instanceof; don't read from classArrayProperties or whatever
    if (value instanceof OOML.Array) {
      obj[propName] = value.toArray();
    } else if (value instanceof OOML.Instance) {
      if (Utils.typeOf(value.serialise, TYPEOF_FUNCTION)) {
        let serialised = value.serialise();
        if (serialised !== undefined) {
          if (!Utils.isPrimitiveValue(serialised)) {
            throw new TypeError(`Value returned from serialise function is not primitive`);
          }
          obj[propName] = serialised;
        }
      } else {
        obj[propName] = value.toObject();
      }
    } else {
      obj[propName] = value;
    }
  });

  return obj;
};
