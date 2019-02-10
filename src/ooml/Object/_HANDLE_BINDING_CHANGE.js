oomlObjectPrototype[__IP_OOML_OBJ_PROTO_HANDLE_BINDING_CHANGE] = function (id, store_value) {
  let _this = this;

  let prop_name = _this[__IP_OOML_OBJ_OWN_BINDINGS][id];

  if (!prop_name) {
    // Because setting up bindings are asynchronous, and dynamic bindings rebind asynchronously,
    // it's possible a binding has already expired, before it even got to send current store value
    return;
  }

  let state = _this[__IP_OOML_OBJ_OWN_PROPERTIES_STATE][prop_name];
  let config = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES][prop_name];

  let current_binding_state = state[__IP_OOML_PROPERTIES_STATE_BINDINGSTATE];
  let is_initial = current_binding_state == __IP_OOML_PROPERTIES_STATE_BINDINGSTATE_ENUMVAL_INIT;

  let new_state;
  let state_change_listener;

  if (store_value !== undefined) {
    new_state = __IP_OOML_PROPERTIES_STATE_BINDINGSTATE_ENUMVAL_EXISTS;
    state_change_listener = config[__BC_CLASSPROP_BINDINGEXIST];
  } else {
    new_state = __IP_OOML_PROPERTIES_STATE_BINDINGSTATE_ENUMVAL_MISSING;
    state_change_listener = config[__BC_CLASSPROP_BINDINGMISSING];
  }

  if (new_state != current_binding_state) {
    state[__IP_OOML_PROPERTIES_STATE_BINDINGSTATE] = new_state;

    if (state_change_listener) {
      // Don't allow prevention; instead, use setter
      _this[state_change_listener](prop_name, store_value, is_initial);
    }
  }

  if (store_value !== undefined) {
    _this[prop_name] = store_value;
  }
};
