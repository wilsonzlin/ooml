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
