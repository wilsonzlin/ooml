/*
    ACCESS
*/
OOMLArrayProto.includes = function(elem, fromIdx) {
    return this.indexOf(elem, fromIdx) > -1;
};
['indexOf', 'lastIndexOf'].forEach(methodName => {
    OOMLArrayProto[methodName] = function(elem, fromIdx) {
        if (!(elem instanceof this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR])) {
            throw new TypeError(`Can't find the index of non-element`);
        }

        return this[OOML_ARRAY_PROPNAME_INTERNALARRAY][methodName](elem, fromIdx);
    };
});
OOMLArrayProto.slice = function() {
    return Array.prototype.slice.apply(this[OOML_ARRAY_PROPNAME_INTERNALARRAY], arguments);
};
OOMLArrayProto.toString = function() {
    return this.toJSON();
};
OOMLArrayProto.toArray = function(startIdx, endIdx) {

    let arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

    startIdx = startIdx || 0;
    endIdx = endIdx == undefined ? this.length : endIdx;

    let ret = [];

    for (let i = startIdx; i < endIdx; i++) {
        if (Utils.typeOf(arr[i].serialise, TYPEOF_FUNCTION)) {
            let serialised = arr[i].serialise();
            if (serialised !== undefined) {
                if (!Utils.isPrimitiveValue(serialised)) {
                    throw new TypeError(`Value returned from serialise function is not primitive`);
                }
                ret.push(serialised);
            }
        } else {
            ret.push(arr[i].toObject());
        }
    }

    return ret;
};
OOMLArrayProto.toJSON = function(startIdx, endIdx) {
    return JSON.stringify(this.toArray(startIdx, endIdx));
};
