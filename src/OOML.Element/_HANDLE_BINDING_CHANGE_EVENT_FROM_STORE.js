OOMLElementProto[OOML_INSTANCE_PROPNAME_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE] = function(key, currentStoreValue) {
    let internalObject = this[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT];
    let currentBindingState = internalObject.bindingState;
    let currentBindingStateIsInitial = currentBindingState == BINDING_STATE_INIT;

    let preventChange;
    let valueToApplyLocally;
    let newState;
    let stateChangeHandler;

    if (currentStoreValue !== undefined) {
        valueToApplyLocally = currentStoreValue;
        newState = BINDING_STATE_EXISTS;
        stateChangeHandler = internalObject.bindingOnExist;
    } else {
        valueToApplyLocally = Utils.getDefaultPrimitiveValueForTypes(internalObject.types);
        newState = BINDING_STATE_MISSING;
        stateChangeHandler = internalObject.bindingOnMissing;
    }

    if (internalObject.bindingState != newState) {
        internalObject.bindingState = newState;

        if (stateChangeHandler) {
            let eventObject = { preventDefault: () => preventChange = true };
            let returnValue = stateChangeHandler.call(this, key, currentStoreValue, currentBindingStateIsInitial, eventObject);
            if (returnValue === false) {
                preventChange = true;
            }
        }
    }

    if (!preventChange) {
        this[key] = valueToApplyLocally;
    }
};
