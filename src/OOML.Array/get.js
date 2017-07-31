OOMLArrayProto.get = function(idx) {
    let arr = this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY];

    let realIdx = idx;
    if (idx < 0) {
        realIdx = this.length + idx;
    }

    let instance = arr[realIdx];
    if (!instance) {
        throw new RangeError(`The offset at index ${ idx } is not a valid offset`);
    }

    return instance;
};
