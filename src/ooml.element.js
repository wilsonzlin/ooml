// TODO Refactor so this is not needed
OOMLElementProto[OOML_INSTANCE_PROPNAME_BINDING_ON_STORE_VALUE_CHANGE] = function(propName, storeValue) {
    handleBindingChangeEventFromStore(instanceProperties[propName], instance, propName, storeValue);
};
