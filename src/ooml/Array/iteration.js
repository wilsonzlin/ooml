u_iterate(["every", "filter", "find", "findIndex", "forEach", "map", "reduce", "reduceRight", "some"], method_name => {
  oomlArrayPrototype[method_name] = function () {
    return Array.prototype[method_name].apply(this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY], arguments);
  };
});

oomlArrayPrototype.forEachRight = function (callback, this_arg) {
  let _this = this;

  let arr = _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];

  for (let i = _this.length - 1; i >= 0; i--) {
    callback.call(this_arg, arr[i], i, _this);
  }
};

if (__compat_Symbol) {
  oomlArrayPrototype[Symbol.iterator] = function () {
    let i = -1;
    let arr = this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];

    return {
      next: () => {
        if (++i == arr.length) {
          return {done: true};
        }

        return {value: arr[i], done: false};
      }
    };
  };
}
