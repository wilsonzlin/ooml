var STRINGSET_PROPNAME_INTERNALARRAY = '__stringSetInternalArray';
var STRINGSET_PROPNAME_INTERNALOBJECT = '__stringSetInternalObject';
var StringSet = function() {
    this[STRINGSET_PROPNAME_INTERNALARRAY] = [];
    this[STRINGSET_PROPNAME_INTERNALOBJECT] = Object.create(null);
};
var StringSetProto = StringSet.prototype;
StringSetProto.add = function(str) {
    if (this[STRINGSET_PROPNAME_INTERNALOBJECT][str] == undefined) {
        var newValueIndex = this[STRINGSET_PROPNAME_INTERNALARRAY].push(str) - 1;
        this[STRINGSET_PROPNAME_INTERNALOBJECT][str] = newValueIndex;
    }
    return this;
};
StringSetProto.clear = function() {
    this[STRINGSET_PROPNAME_INTERNALARRAY] = [];
    this[STRINGSET_PROPNAME_INTERNALOBJECT] = Object.create(null);
};
StringSetProto.delete = function(str) {
    if (this[STRINGSET_PROPNAME_INTERNALOBJECT][str] != undefined) {
        var strIndex = this[STRINGSET_PROPNAME_INTERNALOBJECT][str];
        this[STRINGSET_PROPNAME_INTERNALARRAY].splice(strIndex, 1);
        delete this[STRINGSET_PROPNAME_INTERNALOBJECT][str];
        return true;
    }
    return false;
};
StringSetProto.forEach = function(callback, thisArg) {
    var that = this;
    this[STRINGSET_PROPNAME_INTERNALARRAY].forEach(function(str, index) {
        callback.call(this, str, index, that);
    }, thisArg);
};
StringSetProto.has = function(str) {
    return this[STRINGSET_PROPNAME_INTERNALOBJECT][str] != undefined;
};
StringSetProto.values = function() {
    return this[STRINGSET_PROPNAME_INTERNALARRAY].slice();
};