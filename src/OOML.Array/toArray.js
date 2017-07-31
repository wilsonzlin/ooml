OOMLArrayProto.toArray = function(startIdx, endIdx) {

    let arr = this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY];

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
