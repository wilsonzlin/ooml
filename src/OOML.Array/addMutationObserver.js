OOMLArrayProto.addMutationObserver = function (eventName, observer) {
  if (!Utils_typeOf(eventName, TYPEOF_STRING)) {
    throw TypeError(`Event name is not a string`);
  }

  if (!Utils_typeOf(observer, TYPEOF_FUNCTION)) {
    throw TypeError(`The observer for the mutation event "${ eventName }" is not a function`);
  }

  let oomlArray = this;

  eventName = eventName.toLocaleLowerCase();

  let arrayMutationObservers = oomlArray[OOML_ARRAY_PROPNAME_MUTATION_OBSERVERS];

  if (!arrayMutationObservers[eventName]) {
    arrayMutationObservers[eventName] = [];
  }
  arrayMutationObservers[eventName].push(observer);

  return oomlArray;
};
