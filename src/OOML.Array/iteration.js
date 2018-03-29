["every", "filter", "find", "findIndex", "forEach", "map", "reduce", "reduceRight", "some"].forEach(method => {
  OOMLArrayProto[method] = function () {
    return Array.prototype[method].apply(this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY], arguments);
  };
});
if (OOMLCompatSymbolExists) {
  OOMLArrayProto[Symbol.iterator] = function () {
    let i = -1;
    let arr = this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY];

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
