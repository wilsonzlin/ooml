oomlTablePrototype.get = function (idx) {
  let _this = this;

  idx = _this[__IP_OOML_ARRAY_PROTO_NORMALISE_INDEX]("index", idx);

  return _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY][idx];
};
