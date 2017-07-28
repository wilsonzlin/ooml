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
        newVal = Utils.constructOOMLElementInstance(elemDetails.types[0], newVal);
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
