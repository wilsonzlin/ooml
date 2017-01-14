OOML.Element = function() {
    throw new SyntaxError(`OOML.Element is an abstract class`);
};
let OOMLElementProto = OOML.Element.prototype;
OOMLElementProto.toObject = function() {

    let instance = this;
    let obj = Utils.createCleanObject();

    this.constructor[OOML_CLASS_PROPNAME_PROPNAMES].forEach((propName) => {
        let value = instance[propName];
        if (value instanceof OOML.Array) {
            obj[propName] = value.toArray();
        } else if (value instanceof OOML.Element) {
            obj[propName] = value.toObject();
        } else {
            let serialisedValue;

            if (value && typeof value.oomlSerialisationMethod == 'function') {
                serialisedValue = value.oomlSerialisationMethod(value);
            } else {
                serialisedValue = value;
            }

            obj[propName] = serialisedValue;
        }
    });

    return obj;
};
OOMLElementProto.toJSON = function() {
    return JSON.stringify(this.toObject());
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
