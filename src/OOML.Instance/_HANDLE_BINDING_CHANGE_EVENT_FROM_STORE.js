OOMLInstanceProto[OOML_INSTANCE_PROPNAME_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE] = function(key, currentStoreValue) {
    let instance = this;

    let instanceProperty = instance[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT][key];
    let classProperty = instance.constructor[OOML_CLASS_PROPNAME_PROPERTIES][key];

    let currentBindingState = instanceProperty.bindingState;
    let currentBindingStateIsInitial = currentBindingState == BINDING_STATE_INIT;

    let preventChange;
    let valueToApplyLocally;
    let newState;
    let stateChangeHandler;

    if (currentStoreValue !== undefined) {
        valueToApplyLocally = currentStoreValue;
        newState = BINDING_STATE_EXISTS;
        stateChangeHandler = classProperty.bindingOnExist;
    } else {
        valueToApplyLocally = classProperty.defaultValue;
        newState = BINDING_STATE_MISSING;
        stateChangeHandler = classProperty.bindingOnMissing;
    }

    if (instanceProperty.bindingState != newState) {
        instanceProperty.bindingState = newState;

        if (stateChangeHandler) {
            let eventObject = { preventDefault: () => preventChange = true };
            let returnValue = instance[stateChangeHandler](key, currentStoreValue, currentBindingStateIsInitial, eventObject);
            if (returnValue === false) {
                preventChange = true;
            }
        }
    }

    if (!preventChange) {
        instance[key] = valueToApplyLocally;
    }
};
