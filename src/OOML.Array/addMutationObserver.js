OOMLArrayProto.addMutationObserver = function(eventName, observer) {
    if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
        throw new TypeError(`Event name is not a string`);
    }

    if (!Utils.typeOf(observer, TYPEOF_FUNCTION)) {
        throw new TypeError(`The observer for the mutation event "${ eventName }" is not a function`);
    }

    eventName = eventName.toLocaleLowerCase();

    let arrayMutationObservers = this[OOML_ARRAY_PROPNAME_MUTATION_OBSERVERS];

    if (!arrayMutationObservers[eventName]) {
        arrayMutationObservers[eventName] = [];
    }
    arrayMutationObservers[eventName].push(observer);

    return this;
};
