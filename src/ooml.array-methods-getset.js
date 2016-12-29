/*
    SETTER AND GETTER
*/
OOMLArrayProto.get = function(idx) {
    var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

    var realIdx = idx;
    if (idx < 0) {
        realIdx = this.length + idx;
    }

    var instance = arr[realIdx];
    if (!instance) {
        throw new RangeError('The offset at index ' + idx + ' is not a valid offset');
    }

    return instance;
};
