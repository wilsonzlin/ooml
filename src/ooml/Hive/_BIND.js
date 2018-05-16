oomlHivePrototype[__IP_OOML_HIVE_PROTO_BIND] = function (key, inst) {
  let _this = this;

  if (!_this[__IP_OOML_HIVE_OWN_BINDINGS][key]) {
    _this[__IP_OOML_HIVE_OWN_BINDINGS][key] = [];
  }

  // Avoid zero because it's falsy
  let id = _this[__IP_OOML_HIVE_OWN_BINDINGS][key].length || 1;
  _this[__IP_OOML_HIVE_OWN_BINDINGS][key][id] = inst;
  _this[__IP_OOML_HIVE_OWN_BINDINGIDTOKEYMAP][id] = key;

  // Ensure async as ID has not been stored by instance yet
  _this.get(key, (err, val) => {
    if (err) {
      console.error(err);
      return;
    }

    // .get does NOT auto call _HANDLE_BINDING_CHANGE on this instance,
    // only .set does

    inst[__IP_OOML_INST_PROTO_HANDLE_BINDING_CHANGE](id, val);
  });

  return id;
};
