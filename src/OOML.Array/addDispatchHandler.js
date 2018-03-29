OOMLArrayProto.addDispatchHandler = function (eventName, handler) {
  if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
    throw new TypeError(`Event name is not a string`);
  }

  if (!Utils.typeOf(handler, TYPEOF_FUNCTION)) {
    throw new TypeError(`The handler for the dispatch event "${ eventName }" is not a function`);
  }

  let oomlArray = this;

  eventName = eventName.toLocaleLowerCase();

  let arrayDispatchHandlers = oomlArray[OOML_ARRAY_PROPNAME_DISPATCH_HANDLERS];

  if (!arrayDispatchHandlers[eventName]) {
    arrayDispatchHandlers[eventName] = [];
  }
  arrayDispatchHandlers[eventName].push(handler);

  return oomlArray;
};
