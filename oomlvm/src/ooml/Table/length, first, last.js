Object.defineProperties(oomlTablePrototype, {
  length: {
    get: function () {
      return this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY].length;
    },
  },
  first: {
    get: function () {
      return this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY][0];
    },
  },
  last: {
    get: function () {
      return this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY][this.length - 1];
    },
  },
});
