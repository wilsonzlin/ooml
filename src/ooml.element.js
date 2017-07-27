OOML.Element = function() {
    throw new TypeError(`OOML.Element is an abstract class`);
};

let OOMLElementProto = OOML.Element.prototype;

OOMLElementProto.ondispatch = function(eventName, handler) {
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
OOMLElementProto.onmutation = function(eventName, handler) {
    if (!Utils.typeOf(handler, TYPEOF_FUNCTION)) {
        throw new TypeError(`The handler for the mutation event "${ eventName }" is not a function`);
    }

    if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
        throw new TypeError(`Event name is not a string`);
    }

    eventName = eventName.toLocaleLowerCase();

    let instanceEventHandlers = this[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION];

    if (!instanceEventHandlers[eventName]) {
        instanceEventHandlers[eventName] = [];
    }
    instanceEventHandlers[eventName].push(handler);
    return this;
};
OOMLElementProto.detach = function() {
    let instance = this;

    let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

    if (!instanceIsAttachedTo.parent) {
        throw new ReferenceError(`This instance is not in use`);
    }

    let parent = instanceIsAttachedTo.parent;

    if (parent instanceof OOML.Array) {
        let indexOfThis = parent.indexOf(instance);
        if (indexOfThis < 0) {
            throw new Error(`This instance could not be found on its parent array`);
        }
        // This will call __oomlDetach
        parent.splice(indexOfThis, 1);
    } else if (parent instanceof OOML.Element) {
        // This will call __oomlDetach
        parent[instanceIsAttachedTo.property] = null;
    } else {
        throw new Error(`Unrecognised parent`);
    }

    return instance;
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_ATTACH] = function(settings) {
    let instance = this;
    let instanceDom = instance[OOML_INSTANCE_PROPNAME_DOMELEM];
    let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

    if (instanceIsAttachedTo.parent) {
        throw new ReferenceError(`This instance is already in use`);
    }

    instanceIsAttachedTo.parent = settings.parent;
    instanceIsAttachedTo.property = settings.property;

    settings.insertAfter.parentNode.insertBefore(instanceDom, settings.insertAfter.nextSibling);
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_DETACH] = function() {
    let instance = this;
    let instanceDom = instance[OOML_INSTANCE_PROPNAME_DOMELEM];
    let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

    if (!instanceIsAttachedTo.parent) {
        throw new Error(`This instance is not in use`);
    }

    instanceIsAttachedTo.parent = undefined;

    instanceDom.parentNode.removeChild(instanceDom);
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_GET_PROPERTY] = function(prop) {
    let instanceProperties = this[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT];
    let currentValue = instanceProperties[prop].value;
    if (instanceProperties[prop].getter) {
        return instanceProperties[prop].getter.call(this, prop, currentValue);
    }
    return currentValue;
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_SET_ARRAY_PROPERTY] = function(prop, newVal) {
    let instanceProperties = this[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT];
    if (!Array.isArray(newVal)) {
        throw new TypeError(`Non-array provided to element array substitution property "${prop}"`);
    }
    instanceProperties[prop].value.initialize(newVal);
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_SET_OBJECT_PROPERTY] = function(prop, newVal) {
    // Let constructors handle newVal's type
    if (newVal === undefined) {
        throw new TypeError(`Undefined provided as element substitution property value for "${prop}"`);
    }
    let instanceProperties = this[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT];

    let elemDetails = instanceProperties[prop];

    // This setter could be called WHILE property value is being normalised (i.e. set to not undefined)
    let currentValue = instanceProperties[prop].value;
    let currentlyInitialised = currentValue != undefined;

    if (instanceProperties[prop].setter) {
        let setterReturnVal = instanceProperties[prop].setter.call(this, prop, currentValue, newVal);
        if (setterReturnVal === false) {
            return;
        }

        if (setterReturnVal !== undefined) {
            if (!Utils.isObjectLiteral(setterReturnVal)) {
                throw new TypeError(`Invalid setter return value`);
            }

            if (Utils.hasOwnProperty(setterReturnVal, 'value')) {
                newVal = setterReturnVal.value;
            }
        }
    }

    if (instanceProperties[prop].passthrough != undefined && currentlyInitialised) {
        currentValue[elemDetails.passthrough] = newVal;
        return;
    }

    // Attach first to ensure that element is attachable
    if (newVal !== null) {
        newVal = Utils.constructElement(elemDetails.types[0], newVal);
        newVal[OOML_INSTANCE_PROPNAME_ATTACH]({
            insertAfter: elemDetails.insertAfter,
            parent: this,
            property: prop
        });
    }

    // Current element may be null and therefore does not need detaching
    if (currentlyInitialised) {
        currentValue[OOML_INSTANCE_PROPNAME_DETACH]();
    }

    instanceProperties[prop].value = newVal;
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_SET_PRIMITIVE_PROPERTY] = function(prop, newVal) {
    if (newVal === undefined) {
        throw new TypeError(`Undefined provided as property value for "${prop}"`);
    }
    let instance = this;
    let instanceProperties = instance[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT];

    let customHtml;
    let initial = !instanceProperties[prop].initialised;
    let oldVal = initial ? undefined : instanceProperties[prop].value;

    if (instanceProperties[prop].setter) {
        let setterReturnVal = instanceProperties[prop].setter.call(this, prop, oldVal, newVal);
        if (setterReturnVal === false) {
            return;
        }

        if (setterReturnVal !== undefined) {
            if (!Utils.isObjectLiteral(setterReturnVal)) {
                throw new TypeError(`Invalid setter return value`);
            }

            if (Utils.hasOwnProperty(setterReturnVal, 'value')) {
                newVal = setterReturnVal.value;
            }

            if (Utils.hasOwnProperty(setterReturnVal, 'HTML')) {
                customHtml = setterReturnVal.HTML;
            }
        }
    }

    if (!Utils.isPrimitiveValue(newVal)) {
        throw new TypeError(`Cannot set new property value for "${ prop }"; unrecognised type`);
    }

    if (instanceProperties[prop].types) {
        if (!Utils.isType(instanceProperties[prop].types, newVal)) {
            throw new TypeError(`Cannot set new property value for "${ prop }"; expected type to be one of: ${ instanceProperties[prop].types.join(', ') }`);
        }
    }

    if (initial || oldVal !== newVal) {
        // Write changes only if value changed
        Utils.DOM.writeValue('text', prop, instanceProperties[prop].nodes, newVal, customHtml);

        instanceProperties[prop].value = newVal;

        if (initial) {
            instanceProperties[prop].initialised = true;
        }

        // This should run initially as well (rebinding is really just binding)
        let dependentBindings = propertiesToDependentBindings[prop];
        if (dependentBindings) {
            dependentBindings.attributes.forEach(attrName => {
                let internalObject = instanceAttributes[attrName].binding;
                internalObject.propertyToPartMap[prop].forEach(idx => {
                    internalObject.parts[idx] = newVal;
                });
                rebindDynamicBinding(undefined, attrName);
            });
            dependentBindings.properties.forEach(propName => {
                let internalObject = instanceProperties[propName].binding;
                internalObject.propertyToPartMap[prop].forEach(idx => {
                    internalObject.parts[idx] = newVal;
                });
                rebindDynamicBinding(propName);
            });
        }

        if (classProperties[prop].onchange) {
            classProperties[prop].onchange.call(instance, prop, newVal, initial);
        }

        let propertyValueChangeMutationHandler = instance[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION].propertyvaluechange;
        if (propertyValueChangeMutationHandler) {
            propertyValueChangeMutationHandler.forEach(handler => {
                let eventObject = {
                    property: prop,
                    oldValue: oldVal,
                    newValue: newVal,
                    initial: initial,
                };

                handler.call(instance, eventObject);
            });
        }
    }
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE] = function(internalObject, externalObject, key, currentStoreValue) {
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
        externalObject[key] = valueToApplyLocally;
    }
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_DISPATCH] = function(propName, eventName, data) {
    if (classProperties[propName].dispatchEventHandlers[eventName]) {
        classProperties[propName].dispatchEventHandlers[eventName].call(instance, data);
    }
};
OOMLElementProto.dispatch = function(eventName, eventData) {

    if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
        throw new TypeError(`Event name isn't a string`);
    }

    let prevented = false;
    eventName = eventName.toLocaleLowerCase();

    if (instanceEventHandlers.dispatch[eventName]) {
        instanceEventHandlers.dispatch[eventName].forEach(handler => {
            let eventObject = {
                preventDefault: () => { prevented = true },
                data: eventData,
            };

            let returnValue = handler.call(instance, eventObject);

            if (returnValue === false) {
                prevented = true;
            }
        });
    }

    if (!prevented && instanceIsAttachedTo.parent) {
        instanceIsAttachedTo.parent[OOML_INSTANCE_PROPNAME_DISPATCH](instanceIsAttachedTo.property, eventName, eventData);
    }

};
OOMLElementProto[OOML_INSTANCE_PROPNAME_BINDING_ON_STORE_VALUE_CHANGE] = function(propName, storeValue) {
    handleBindingChangeEventFromStore(instanceProperties[propName], instance, propName, storeValue);
};


OOMLElementProto.keys = function() {
    // TODO
};
OOMLElementProto.toObject = function() {

    let instance = this;
    let obj = Utils.createCleanObject();

    let klass = instance.constructor;

    klass[OOML_CLASS_PROPNAME_PROPNAMES].forEach((propName) => {
        if (klass[OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES].has(propName)) {
            return;
        }

        let value = instance[propName];
        // Use instanceof; don't read from classArrayProperties or whatever
        if (value instanceof OOML.Array) {
            obj[propName] = value.toArray();
        } else if (value instanceof OOML.Element) {
            if (Utils.typeOf(value.serialise, TYPEOF_FUNCTION)) {
                let serialised = value.serialise();
                if (serialised !== undefined) {
                    if (!Utils.isPrimitiveValue(serialised)) {
                        throw new TypeError(`Value returned from serialise function is not primitive`);
                    }
                    obj[propName] = serialised;
                }
            } else {
                obj[propName] = value.toObject();
            }
        } else {
            obj[propName] = value;
        }
    });

    return obj;
};
OOMLElementProto.toJSON = function(indentation) {
    return JSON.stringify(this.toObject(), undefined, indentation);
};
OOMLElementProto.assign = function() {
    let oomlInstance = this;

    for (let i = 0; i < arguments.length; i++) {

        let source = arguments[i];

        // Don't use Object.assign because 1) compatibility 2) it sets non-existent properties
        Object.keys(source).forEach((prop) => oomlInstance[prop] = source[prop]); // Probably don't need to clone as not mutated
    }

    return oomlInstance;
};
if (OOMLCompatSymbolExists) {
    OOMLElementProto[Symbol.iterator] = function() {
        let inst = this;
        let propNamesIterator = inst.constructor[OOML_CLASS_PROPNAME_PROPNAMES].values();

        return {
            next: () => {
                let it = propNamesIterator.next();
                if (it.done) {
                    return it;
                }
                let itValue = it.value;
                return { value: [itValue, inst[itValue]], done: false };
            }
        };
    };
}
