oomlHivePrototype[__IP_OOML_HIVE_PROTO_UNBIND] = function (id) {
  let _this = this;

  _this[__IP_OOML_HIVE_OWN_BINDINGS][
    _this[__IP_OOML_HIVE_OWN_BINDINGIDTOKEYMAP][id]
    ][id] = undefined;
};
