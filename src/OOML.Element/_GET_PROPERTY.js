OOMLElementProto[OOML_INSTANCE_PROPNAME_GET_PROPERTY] = function(prop) {
    let instanceProperties = this[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT];
    let currentValue = instanceProperties[prop].value;
    if (instanceProperties[prop].getter) {
        return instanceProperties[prop].getter.call(this, prop, currentValue);
    }
    return currentValue;
};
