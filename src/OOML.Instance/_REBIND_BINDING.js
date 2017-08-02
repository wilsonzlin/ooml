OOMLInstanceProto[OOML_INSTANCE_PROPNAME_REBIND_BINDING] = function(property) {
    let instance = this;

    let instanceProperty = instance[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT][property];
    let classProperty = instance.constructor[OOML_CLASS_PROPNAME_PROPERTIES][property];

    let propertyRebindSetTimeouts = instance[OOML_INSTANCE_PROPNAME_PROPERTY_REBIND_SET_TIMEOUTS];

    clearTimeout(propertyRebindSetTimeouts[property]);

    propertyRebindSetTimeouts[property] = setTimeout(() => {
        let currentBindingId = instanceProperty.bindingId;

        let keypath;

        if (instanceProperty.bindingParts) {
            keypath = instanceProperty.bindingParts.join("");
        } else {
            keypath = classProperty.bindingKeypath;
        }

        if (currentBindingId) {
            hive.unbind(currentBindingId);
        }

        instanceProperty.bindingId = hive.bind(keypath, instance, property);
    }, 50);
};
