OOMLInstanceProto.addMutationObserver = function (eventName, observer) {
  if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
    throw new TypeError(`Event name is not a string`);
  }

  if (!Utils.typeOf(observer, TYPEOF_FUNCTION)) {
    throw new TypeError(`The observer for the mutation event "${ eventName }" is not a function`);
  }

  eventName = eventName.toLocaleLowerCase();

  let instanceEventHandlers = this[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION];

  if (!instanceEventHandlers[eventName]) {
    instanceEventHandlers[eventName] = [];
  }
  instanceEventHandlers[eventName].push(observer);

  return this;
};
