OOMLArrayProto[OOML_INSTANCE_PROPNAME_DISPATCH] = function(_, eventName, eventData) {
    if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
        throw new TypeError(`Event name isn't a string`);
    }

    eventName = eventName.toLocaleLowerCase();

    let prevented = false;

    if (dispatchEventHandlers[eventName]) {
        dispatchEventHandlers[eventName].forEach(handler => {
            let eventObject = {
                preventDefault: () => {
                    prevented = true
                },
                data: eventData,
            };

            if (handler.call(_this, eventObject) === false) {
                prevented = true;
            }
        });
    }

    if (!prevented) {
        attachedToInstance[OOML_INSTANCE_PROPNAME_DISPATCH](attachedToProperty, eventName, eventData);
    }
};
