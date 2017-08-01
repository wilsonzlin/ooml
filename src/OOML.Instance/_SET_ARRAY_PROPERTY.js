OOMLInstanceProto[OOML_INSTANCE_PROPNAME_SET_ARRAY_PROPERTY] = function(prop, newVal) {
    let instanceProperty = this[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT][prop];
    let classProperty = this.constructor[OOML_CLASS_PROPNAME_PROPERTIES][prop];

    if (newVal !== null &&!Array.isArray(newVal)) {
        throw new TypeError(`Non-array provided to element array substitution property "${prop}"`);
    }

    if (instanceProperty.currentValue) {
        instanceProperty[OOML_ARRAY_PROPNAME_DETACH]();
    }

    let newOomlArray = new OOML.Array(classProperty.types, newVal);
    newOomlArray[OOML_ARRAY_PROPNAME_ATTACH](this, prop, instanceProperty.insertAfter);

    instanceProperty.currentValue = newOomlArray;
};
