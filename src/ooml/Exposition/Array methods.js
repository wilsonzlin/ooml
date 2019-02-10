u_iterate(["every", "filter", "find", "forEach", "map", "reduce", "reduceRight", "some"], method_name => {
  oomlExpositionPrototype[method_name] = function () {
    return Array.prototype[method_name].apply(this[__IP_OOML_EXPO_OWN_NODES], arguments);
  };
});
