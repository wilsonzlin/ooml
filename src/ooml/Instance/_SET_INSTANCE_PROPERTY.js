oomlInstancePrototype[__IP_OOML_INST_PROTO_SET_INSTANCE_PROPERTY] = function (prop_name, new_value) {
  // $new_value is assumed to be not undefined
  let _this = this;

  let state = _this[__IP_OOML_INST_OWN_PROPERTIES_STATE][prop_name];
  let config = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES][prop_name];

  // $current_value is an instance, null, or undefined;
  // it can only be undefined during class instantiation
  let current_value = state[__IP_OOML_PROPERTIES_STATE_CURRENTVALUE];
  let is_initial = current_value === undefined;
  let current_value_is_inst = current_value != undefined;

  if (config[__BC_CLASSPROP_SET]) {
    let setter_rv = _this[config[__BC_CLASSPROP_SET]](new_value, current_value, prop_name);
    if (setter_rv === false) {
      return;
    }

    if (setter_rv && u_typeof(setter_rv, TYPEOF_OBJECT)) {
      // Require object even if only one property,
      // as this allows forwards compatibility

      if (setter_rv.value != undefined) {
        new_value = setter_rv.value;
      }
    }
  }

  if (config[__BC_CLASSPROP_PASSTHROUGH] &&
      // This also covers null
      !u_typeof(new_value, TYPEOF_OBJECT) &&
      current_value_is_inst) {
    current_value[config[__BC_CLASSPROP_PASSTHROUGH]] = new_value;
    return;
  }

  // Attach first to ensure that element is attachable
  if (new_value != null) {
    new_value = construct_ooml_instance(config[__BC_CLASSPROP_TYPE], new_value);
    // NODES[0] is undefined if not substituted
    new_value[__IP_OOML_EVENTSOURCE_PROTO_ATTACH](_this, prop_name, state[__IP_OOML_PROPERTIES_STATE_NODES][0]);
  }

  // Current element may be null and therefore does not need detaching
  if (current_value_is_inst) {
    current_value[__IP_OOML_EVENTSOURCE_PROTO_ERASE_ATTACHMENT_CONFIG]();
  }

  state[__IP_OOML_PROPERTIES_STATE_CURRENTVALUE] = new_value;

  // Because initially $current_value is undefined and $new_value cannot be undefined,
  // this runs initially as well
  // Use triple equals because $current_value could be undefined
  if (current_value !== new_value) {
    // Call change handler if assigned to and changed to a new instance or null
    // Don't need to call for passthrough, as setting the property on the passthrough instance
    // will trigger change event`
    u_iterate(config[__BC_CLASSPROP_CHANGE], method_name => {
      _this[method_name](current_value, is_initial);
    });
  }
};
