/*
    ACCESS
*/
OOMLArrayProto.includes = function(elem, fromIdx) {
    return this.indexOf(elem, fromIdx) > -1;
};
OOMLArrayProto.indexOf = function(elem, fromIdx) {
    if (!(elem instanceof this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR])) {
        throw new TypeError('Can\'t find the index of non-element');
    }

    return this[OOML_ARRAY_PROPNAME_INTERNALARRAY].indexOf(elem, fromIdx);
};
OOMLArrayProto.lastIndexOf = function(elem, fromIdx) {
    if (!(elem instanceof this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR])) {
        throw new TypeError('Can\'t find the index of non-element');
    }

    return this[OOML_ARRAY_PROPNAME_INTERNALARRAY].lastIndexOf(elem, fromIdx);
};
OOMLArrayProto.toString = function() {
    return this.toJSON();
};
OOMLArrayProto.toArray = function(startIdx, endIdx) {

    var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

    startIdx = startIdx || 0;
    endIdx = endIdx == undefined ? this.length : endIdx;

    var ret = [];

    for (var i = startIdx; i < endIdx; i++) {
        ret.push(arr[i].toObject());
    }

    return ret;
};
OOMLArrayProto.toJSON = function(startIdx, endIdx) {
    return JSON.stringify(this.toArray(startIdx, endIdx));
};
