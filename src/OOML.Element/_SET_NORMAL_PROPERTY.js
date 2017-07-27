// TODO Rename as not limited to primitives (suppressed properties can have any non-undefined type)
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
