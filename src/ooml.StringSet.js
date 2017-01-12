var STRINGSET_PROPNAME_INTERNALARRAY = '__stringSetInternalArray';
var STRINGSET_PROPNAME_INTERNALOBJECT = '__stringSetInternalObject';
var StringSet = function() {
    var _this = this;

    _this[STRINGSET_PROPNAME_INTERNALARRAY] = [];
    _this[STRINGSET_PROPNAME_INTERNALOBJECT] = Utils.createCleanObject();

    Object.defineProperty(_this, 'size', {
        get: () => _this[STRINGSET_PROPNAME_INTERNALARRAY].length,
    });
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
    this[STRINGSET_PROPNAME_INTERNALOBJECT] = Utils.createCleanObject();
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
    var _this = this;
    this[STRINGSET_PROPNAME_INTERNALARRAY].forEach((str, index) => {
        callback.call(thisArg, str, index, _this);
    });
};
StringSetProto.has = function(str) {
    return this[STRINGSET_PROPNAME_INTERNALOBJECT][str] != undefined;
};
StringSetProto.values = function() {
    return this[STRINGSET_PROPNAME_INTERNALARRAY].slice();
};
