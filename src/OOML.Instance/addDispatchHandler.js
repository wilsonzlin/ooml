OOMLInstanceProto.addDispatchHandler = function (eventName, handler) {
  if (!Utils_typeOf(eventName, TYPEOF_STRING)) {
    throw TypeError(`Event name is not a string`);
  }

  if (!Utils_typeOf(handler, TYPEOF_FUNCTION)) {
    throw TypeError(`The handler for the dispatch event "${ eventName }" is not a function`);
  }

  eventName = eventName.toLocaleLowerCase();

  let instanceEventHandlers = this[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH];

  if (!instanceEventHandlers[eventName]) {
    instanceEventHandlers[eventName] = [];
  }
  instanceEventHandlers[eventName].push(handler);
  return this;
};
