OOMLElementProto.addDispatchHandler = function(eventName, handler) {
    if (!Utils.typeOf(handler, TYPEOF_FUNCTION)) {
        throw new TypeError(`The handler for the dispatch event "${ eventName }" is not a function`);
    }

    if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
        throw new TypeError(`Event name is not a string`);
    }

    eventName = eventName.toLocaleLowerCase();

    let instanceEventHandlers = this[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH];

    if (!instanceEventHandlers[eventName]) {
        instanceEventHandlers[eventName] = [];
    }
    instanceEventHandlers[eventName].push(handler);
    return this;
};
