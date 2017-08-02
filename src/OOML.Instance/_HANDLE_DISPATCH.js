OOMLInstanceProto[OOML_INSTANCE_PROPNAME_HANDLE_DISPATCH] = function(propName, eventName, data) {
    let instance = this;

    let classProperty = instance.constructor[OOML_CLASS_PROPNAME_PROPERTIES][propName];

    if (classProperty.dispatchEventHandlers[eventName]) {
        let methodName = classProperty.dispatchEventHandlers[eventName];
        instance[methodName](data);
    }
};
