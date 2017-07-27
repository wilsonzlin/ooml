OOMLElementProto.dispatch = function(eventName, eventData) {

    if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
        throw new TypeError(`Event name isn't a string`);
    }

    let prevented = false;
    eventName = eventName.toLocaleLowerCase();

    if (instanceEventHandlers.dispatch[eventName]) {
        instanceEventHandlers.dispatch[eventName].forEach(handler => {
            let eventObject = {
                preventDefault: () => { prevented = true },
                data: eventData,
            };

            let returnValue = handler.call(instance, eventObject);

            if (returnValue === false) {
                prevented = true;
            }
        });
    }

    if (!prevented && instanceIsAttachedTo.parent) {
        instanceIsAttachedTo.parent[OOML_INSTANCE_PROPNAME_DISPATCH](instanceIsAttachedTo.property, eventName, eventData);
    }

};
