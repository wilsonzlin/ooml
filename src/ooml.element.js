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
        if (value instanceof OOML.Array) {
            obj[propName] = value.toArray();
        } else if (value instanceof OOML.Element) {
            // WARNING: Element properties may have an HTMLElement object as its value,
            //          so don't rely on it being a serialisable OOML.Element instance
            //          just because its an element substitution property
            if (typeof value.serialise == 'function') {
                obj[propName] = value.serialise();
            } else {
                obj[propName] = value.toObject();
            }
        } else {
            obj[propName] = value;
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
