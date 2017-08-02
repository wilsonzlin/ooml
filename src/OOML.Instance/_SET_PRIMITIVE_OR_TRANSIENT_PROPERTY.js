OOMLInstanceProto[OOML_INSTANCE_PROPNAME_SET_PRIMITIVE_OR_TRANSIENT_PROPERTY] = function(prop, newVal) {
    if (newVal === undefined) {
        throw new TypeError(`Undefined provided as property value for "${prop}"`);
    }

    let instance = this;
    let instanceProperties = instance[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT];
    let instanceProperty = instanceProperties[prop];
    let classProperties = instance.constructor[OOML_CLASS_PROPNAME_PROPERTIES];
    let classProperty = classProperties[prop];

    let customHtml;
    let oldVal = instanceProperty.currentValue;
    let initial = oldVal === undefined;

    if (classProperty.setter) {
        let setterReturnVal = instance[classProperty.setter](prop, oldVal, newVal, initial);
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

    if (!classProperty.isTransient) {
        if (!Utils.isPrimitiveValue(newVal)) {
            throw new TypeError(`Cannot set new property value for "${ prop }"; unrecognised type`);
        }
    } else {
        if (newVal === undefined) {
            throw new TypeError(`Cannot set new property value for "${ prop }" to undefined`);
        }
    }

    let acceptableTypes = classProperty.types;
    if (acceptableTypes) {
        if (!Utils.isType(acceptableTypes, newVal)) {
            throw new TypeError(`Cannot set new property value for "${ prop }"; expected type to be one of: ${ acceptableTypes.join(', ') }`);
        }
    }

    if (initial || oldVal !== newVal) {
        // Write changes only if value changed
        Utils.DOM.writeValue(prop, instanceProperty.nodes, newVal, customHtml);

        if (classProperty.isAttribute) {
            Utils.DOM.setData(instance[OOML_INSTANCE_PROPNAME_DOMELEM], prop, newVal);
        }

        instanceProperty.currentValue = newVal;

        // This should run initially as well (rebinding is really just binding)
        let dependentBindings = instance.constructor[OOML_CLASS_PROPNAME_PROPERTIES_TO_DEPENDENT_BINDINGS][prop];
        if (dependentBindings) {
            dependentBindings.forEach(dependentProperty => {
                classProperties[dependentProperty].bindingPropertyToPartMap[prop].forEach(idx => {
                    instanceProperties[dependentProperty].bindingParts[idx] = newVal;
                });
                instance[OOML_INSTANCE_PROPNAME_REBIND_BINDING](dependentProperty);
            });
        }

        if (classProperty.onChange) {
            classProperty.onChange.call(instance, prop, newVal, initial);
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
