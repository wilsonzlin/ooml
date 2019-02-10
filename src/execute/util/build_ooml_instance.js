let build_ooml_instance = (_this, ooml_class, initial_state, constructor_args) => {
  _this = _this || Object.create(ooml_class.prototype);

  ooml.EventSource.call(_this);

  let collapsed_properties = ooml_class[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES];
  let collapsed_property_names = ooml_class[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTY_NAMES];

  // Set up internal properties
  let properties_state = u_new_clean_object();

  u_iterate(collapsed_property_names, prop_name => {
    let prop_state = u_new_clean_object();

    // Also can have __IP_OOML_PROPERTIES_STATE_CUSTOMHTMLDOMELEMS with array
    // but don't initialise until first use to save memory

    if (collapsed_properties[prop_name][__BC_CLASSPROP_BINDING]) {
      prop_state[__IP_OOML_PROPERTIES_STATE_BINDINGPARTS] = collapsed_properties[prop_name][__BC_CLASSPROP_BINDING].slice();
      prop_state[__IP_OOML_PROPERTIES_STATE_BINDINGSTATE] = __IP_OOML_PROPERTIES_STATE_BINDINGSTATE_ENUMVAL_INIT;
      // This is safe here, as it's async
      // Any dependency parts will have been filled when setting their initial values below
      _this[__IP_OOML_OBJ_PROTO_REBIND_BINDING](prop_name);
    }

    properties_state[prop_name] = prop_state;
  });

  // Don't need to use set as even attributes with multiple substitutions to the same property
  // are only added once as their maps' keys are used
  // Instance/array substitutions will have their only node at index 0
  // If a property is not substituted (inc. array/inst props), this will be empty
  let renderings = [];

  u_define_data_property(_this, __IP_OOML_OBJ_OWN_RENDERINGS, renderings);
  u_define_data_property(_this, __IP_OOML_OBJ_OWN_PROPERTIES_STATE, properties_state);
  u_define_data_property(_this, __IP_OOML_OBJ_OWN_BINDINGS, u_new_clean_object());
  u_define_data_property(_this, __IP_OOML_OBJ_OWN_REBINDING_SET_TIMEOUTS, u_new_clean_object());

  // Prevent assigning to non-existent properties
  u_prevent_ext(_this);

  // Assign values from initial state or default values
  u_iterate(collapsed_property_names, prop_name => {
    let prop_config = collapsed_properties[prop_name];
    let has_default_value = u_has_own_property(prop_config, __BC_CLASSPROP_DEFAULTVALUE);
    let default_value = prop_config[__BC_CLASSPROP_DEFAULTVALUE];

    // Initial (re)bindings are done when setting up internal properties state above

    if (initial_state && u_has_own_property(initial_state, prop_name)) {
      let passthrough_property = prop_config[__BC_CLASSPROP_PASSTHROUGH];

      if (passthrough_property) {
        // If passthrough, initialise instance with initial state built-in
        // (to prevent it counting as a change, and to increase efficiency)
        let expanded = u_assign({}, default_value);
        expanded[passthrough_property] = initial_state[prop_name];
        // Default value could be null or undefined
        _this[prop_name] = expanded;

      } else {
        // Otherwise, just use provided value
        _this[prop_name] = initial_state[prop_name];
      }

    } else {
      if (has_default_value) {
        // Don't need to clone, as it won't be modified
        _this[prop_name] = default_value;
      } else {
        // Neither this property nor any ancestor has a default value,
        // and no value is provided by $init_state_source
        _this[prop_name] = get_default_value_for_type(prop_config[__BC_CLASSPROP_TYPE]);
      }
    }
  });

  // Call constructor
  if (_this[__IP_OOML_CLASS_PROTO_CONSTRUCTOR]) {
    _this[__IP_OOML_CLASS_PROTO_CONSTRUCTOR].apply(_this, constructor_args);
  }
};
