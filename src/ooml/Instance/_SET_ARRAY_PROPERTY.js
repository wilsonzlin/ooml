oomlInstancePrototype[__IP_OOML_INST_PROTO_SET_ARRAY_PROPERTY] = function (prop_name, new_value) {
  // $new_value is assumed to be not undefined
  let _this = this;

  let state = _this[__IP_OOML_INST_OWN_PROPERTIES_STATE][prop_name];
  let config = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES][prop_name];

  let current_value = state[__IP_OOML_PROPERTIES_STATE_CURRENTVALUE];
  let is_initial = current_value === undefined;

  // ooml.Array constructor will check $new_value type

  if (current_value) {
    current_value[__IP_OOML_EVENTSOURCE_PROTO_ERASE_ATTACHMENT_CONFIG]();
  }

  if (new_value != undefined) {
    if (!(new_value instanceof ooml.Array)) {
      new_value = new ooml.Array(config[__BC_CLASSPROP_TYPE], new_value);
    }
    // This property might not be substituted, so NODES[0] == undefined
    new_value[__IP_OOML_EVENTSOURCE_PROTO_ATTACH](this, prop_name, state[__IP_OOML_PROPERTIES_STATE_NODES[0]]);
  }

  state[__IP_OOML_PROPERTIES_STATE_CURRENTVALUE] = new_value;

  // Because initially $current_value is undefined and $new_value cannot be undefined,
  // this runs initially as well
  // Use triple equals because $current_value could be undefined
  if (current_value !== new_value) {
    // Call change handler if assigned to and changed to a new instance or null
    u_iterate(config[__BC_CLASSPROP_CHANGE], method_name => {
      _this[method_name](current_value, is_initial);
    });
  }
};
