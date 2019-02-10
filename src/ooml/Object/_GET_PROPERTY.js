oomlObjectPrototype[__IP_OOML_OBJ_PROTO_GET_PROPERTY] = function (prop_name) {
  let _this = this;

  let state = _this[__IP_OOML_OBJ_OWN_PROPERTIES_STATE][prop_name];
  let config = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES][prop_name];

  let current_value = state[__IP_OOML_PROPERTIES_STATE_CURRENTVALUE];

  if (config[__BC_CLASSPROP_GET]) {
    return _this[config[__BC_CLASSPROP_GET]](current_value, prop_name);
  }

  return current_value;
};
