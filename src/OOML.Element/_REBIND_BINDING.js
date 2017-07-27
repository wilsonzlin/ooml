// TODO Rename as initially all bindings (even fixed ones) are "rebinded"
OOMLElementProto[OOML_INSTANCE_PROPNAME_REBIND_DYNAMIC_BINDING] = function(property) {

    let instanceProperties = this[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT];
    let propertyRebindSetTimeouts = this[OOML_INSTANCE_PROPNAME_PROPERTY_REBIND_SET_TIMEOUTS];

    clearTimeout(propertyRebindSetTimeouts[property]);

    propertyRebindSetTimeouts[property] = setTimeout(() => {
        let internalObject = instanceProperties[property];
        let currentBindingId = internalObject.bindingId;

        if (internalObject.bindingIsDynamic) {
            internalObject.bindingKeypath = internalObject.bindingParts.join("");
        }

        if (currentBindingId != undefined) {
            hive.unbind(currentBindingId);
        }

        internalObject.bindingId = hive.bind(internalObject.bindingKeypath, instance, property);
    }, 50);
};
