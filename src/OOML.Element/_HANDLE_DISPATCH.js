// TODO Change name
OOMLElementProto[OOML_INSTANCE_PROPNAME_DISPATCH] = function(propName, eventName, data) {
    if (classProperties[propName].dispatchEventHandlers[eventName]) {
        classProperties[propName].dispatchEventHandlers[eventName].call(instance, data);
    }
};
