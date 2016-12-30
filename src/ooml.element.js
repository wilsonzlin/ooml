OOML.Element = function() {};
var OOMLElementProto = OOML.Element.prototype;
OOMLElementProto.toObject = function() {

    var instance = this;
    var obj = Utils.createCleanObject();

    this.constructor[OOML_CLASS_PROPNAME_PROPNAMES].forEach(function(propName) {
        var value = instance[propName];
        if (value !== undefined) {
            if (Utils.isPrimitiveValue(value)) {
                obj[propName] = value;
            } else if (value == null) {
                obj[propName] = null;
            } else if (value instanceof OOML.Array) {
                obj[propName] = value.toArray();
            } else {
                obj[propName] = value.toObject();
            }
        }
    });

    return obj;
};
OOMLElementProto.toJSON = function() {
    return JSON.stringify(this.toObject());
};
OOMLElementProto.assign = function() {
    var oomlInstance = this;

    for (var i = 0; i < arguments.length; i++) {

        var source = arguments[i];

        // Don't use Object.assign because 1) compatibility 2) it sets non-existent properties
        Object.keys(source).forEach(function(prop) {
            oomlInstance[prop] = source[prop]; // Probably don't need to clone as not mutated
        });
    }

    return this;
};
if (typeof Symbol == "function") {
    OOMLElementProto[Symbol.iterator] = function() {
        var inst = this,
            propNamesIterator = this.constructor[OOML_CLASS_PROPNAME_PROPNAMES].values();

        return {
            next: function() {
                var it = propNamesIterator.next();
                if (it.done) {
                    return it;
                }
                return { value: inst[it.value], done: false };
            }
        };
    };
}
