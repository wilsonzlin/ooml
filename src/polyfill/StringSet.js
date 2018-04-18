let StringSet;

if (__compat_Set) {
  StringSet = Set;

} else {
  StringSet = function (initialValues) {
    let _this = this;

    _this[__IP_STRINGSET_INTERNALARRAY] = [];
    _this[__IP_STRINGSET_INTERNALOBJECT] = u_new_clean_object();

    if (initialValues) {
      initialValues.forEach(v => _this.add(v));
    }
  };

  let StringSetPrototype = StringSet.prototype;

  StringSetPrototype.add = function (str) {
    if (this[__IP_STRINGSET_INTERNALOBJECT][str] == undefined) {
      this[__IP_STRINGSET_INTERNALOBJECT][str] = this[__IP_STRINGSET_INTERNALARRAY].push(str) - 1;
    }
    return this;
  };

  StringSetPrototype.clear = function () {
    this[__IP_STRINGSET_INTERNALARRAY] = [];
    this[__IP_STRINGSET_INTERNALOBJECT] = u_new_clean_object();
  };

  StringSetPrototype.delete = function (str) {
    if (u_typeof(str, TYPEOF_STRING) && this[__IP_STRINGSET_INTERNALOBJECT][str] != undefined) {
      let str_index = this[__IP_STRINGSET_INTERNALOBJECT][str];
      this[__IP_STRINGSET_INTERNALARRAY].splice(str_index, 1);
      delete this[__IP_STRINGSET_INTERNALOBJECT][str];
      return true;
    }
    return false;
  };

  StringSetPrototype.forEach = function (callback, thisArg) {
    let _this = this;
    this[__IP_STRINGSET_INTERNALARRAY].forEach((str, index) => {
      callback.call(thisArg, str, index, _this);
    });
  };

  StringSetPrototype.has = function (str) {
    return u_typeof(str, TYPEOF_STRING) &&
           this[__IP_STRINGSET_INTERNALOBJECT][str] != undefined;
  };

  StringSetPrototype.values = function () {
    return this[__IP_STRINGSET_INTERNALARRAY].slice();
  };

  Object.defineProperty(StringSetPrototype, "size", {
    get: function () {
      return this[__IP_STRINGSET_INTERNALARRAY].length;
    },
  });
}
