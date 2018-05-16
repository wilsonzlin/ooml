oomlInstancePrototype[__IP_OOML_INST_PROTO_REBIND_BINDING] = function (prop_name) {
  let _this = this;

  let state = _this[__IP_OOML_INST_OWN_PROPERTIES_STATE][prop_name];

  let bindings = this[__IP_OOML_INST_OWN_BINDINGS];
  let rebinding_set_timeouts = _this[__IP_OOML_INST_OWN_REBINDING_SET_TIMEOUTS];

  clearTimeout(rebinding_set_timeouts[prop_name]);

  rebinding_set_timeouts[prop_name] = setTimeout(() => {
    let current_binding_id = state[__IP_OOML_PROPERTIES_STATE_BINDINGID];

    let key = state[__IP_OOML_PROPERTIES_STATE_BINDINGPARTS].join("");

    // Can't be zero
    if (current_binding_id) {
      delete bindings[current_binding_id];
      global_hive[__IP_OOML_HIVE_PROTO_UNBIND](current_binding_id);
    }

    let id = state[__IP_OOML_PROPERTIES_STATE_BINDINGID] = global_hive[__IP_OOML_HIVE_PROTO_BIND](key, _this);
    bindings[id] = prop_name;
  });
};
