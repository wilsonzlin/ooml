OOMLElementProto[OOML_INSTANCE_PROPNAME_SET_ARRAY_PROPERTY] = function(prop, newVal) {
    let instanceProperties = this[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT];
    if (!Array.isArray(newVal)) {
        throw new TypeError(`Non-array provided to element array substitution property "${prop}"`);
    }
    instanceProperties[prop].value.initialize(newVal);
};
