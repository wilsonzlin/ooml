OOML.Element = function() {
    throw new TypeError(`OOML.Element is an abstract class`);
};
let OOMLElementProto = OOML.Element.prototype;
OOMLElementProto.toObject = function() {

    let instance = this;
    let obj = Utils.createCleanObject();

    let klass = this.constructor;

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

    return this;
};
if (OOMLCompatSymbolExists) {
    OOMLElementProto[Symbol.iterator] = function() {
        let inst = this;
        let propNamesIterator = this.constructor[OOML_CLASS_PROPNAME_PROPNAMES].values();

        return {
            next: () => {
                let it = propNamesIterator.next();
                if (it.done) {
                    return it;
                }
                return { value: inst[it.value], done: false };
            }
        };
    };
}
