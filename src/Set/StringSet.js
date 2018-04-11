let StringSet;
if (OOMLCompatSetExists) {
  StringSet = Set;
} else {
  let STRINGSET_PROPNAME_INTERNALARRAY = "__stringSetInternalArray";
  let STRINGSET_PROPNAME_INTERNALOBJECT = "__stringSetInternalObject";
  StringSet = function (initialValues) {
    let _this = this;

    _this[STRINGSET_PROPNAME_INTERNALARRAY] = [];
    _this[STRINGSET_PROPNAME_INTERNALOBJECT] = Utils_createCleanObject();

    if (initialValues) {
      initialValues.forEach(v => _this.add(v));
    }
  };
  let StringSetProto = StringSet.prototype;
  StringSetProto.add = function (str) {
    if (this[STRINGSET_PROPNAME_INTERNALOBJECT][str] == undefined) {
      this[STRINGSET_PROPNAME_INTERNALOBJECT][str] = this[STRINGSET_PROPNAME_INTERNALARRAY].push(str) - 1;
    }
    return this;
  };
  StringSetProto.clear = function () {
    this[STRINGSET_PROPNAME_INTERNALARRAY] = [];
    this[STRINGSET_PROPNAME_INTERNALOBJECT] = Utils_createCleanObject();
  };
  StringSetProto.delete = function (str) {
    if (this[STRINGSET_PROPNAME_INTERNALOBJECT][str] != undefined) {
      let strIndex = this[STRINGSET_PROPNAME_INTERNALOBJECT][str];
      this[STRINGSET_PROPNAME_INTERNALARRAY].splice(strIndex, 1);
      delete this[STRINGSET_PROPNAME_INTERNALOBJECT][str];
      return true;
    }
    return false;
  };
  StringSetProto.forEach = function (callback, thisArg) {
    let _this = this;
    this[STRINGSET_PROPNAME_INTERNALARRAY].forEach((str, index) => {
      callback.call(thisArg, str, index, _this);
    });
  };
  StringSetProto.has = function (str) {
    return this[STRINGSET_PROPNAME_INTERNALOBJECT][str] != undefined;
  };
  StringSetProto.values = function () {
    return this[STRINGSET_PROPNAME_INTERNALARRAY].slice();
  };
  Object.defineProperty(StringSetProto, "size", {
    get: function () {
      return this[STRINGSET_PROPNAME_INTERNALARRAY].length;
    },
  });
}
