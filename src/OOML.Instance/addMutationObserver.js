OOMLInstanceProto.addMutationObserver = function (eventName, observer) {
  if (!Utils_typeOf(eventName, TYPEOF_STRING)) {
    throw TypeError(`Event name is not a string`);
  }

  if (!Utils_typeOf(observer, TYPEOF_FUNCTION)) {
    throw TypeError(`The observer for the mutation event "${ eventName }" is not a function`);
  }

  eventName = eventName.toLocaleLowerCase();

  let instanceEventHandlers = this[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION];

  if (!instanceEventHandlers[eventName]) {
    instanceEventHandlers[eventName] = [];
  }
  instanceEventHandlers[eventName].push(observer);

  return this;
};
