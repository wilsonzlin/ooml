ooml.Hive = function () {
  let _this = this;

  if (!(_this instanceof ooml.Hive)) {
    throw TypeError(`Illegal constructor invocation`);
  }

  let vals = u_new_clean_object();
  let bindings = u_new_clean_object();
  // This is required so an instance can unbind without having to know original key,
  // useful for dynamic bindings
  let binding_id_to_key_map = u_new_clean_object();

  // Each is either { regex: /some::key/, fn: fn } or { str: "some::key", fn: fn }
  let getters = [];
  let setters = [];
  let change_listeners = [];

  u_define_data_property(_this, __IP_OOML_HIVE_OWN_VALUES, vals);
  u_define_data_property(_this, __IP_OOML_HIVE_OWN_BINDINGS, bindings);
  u_define_data_property(_this, __IP_OOML_HIVE_OWN_BINDINGIDTOKEYMAP, binding_id_to_key_map);
  u_define_data_property(_this, __IP_OOML_HIVE_OWN_GETTERS, getters);
  u_define_data_property(_this, __IP_OOML_HIVE_OWN_SETTERS, setters);
  u_define_data_property(_this, __IP_OOML_HIVE_OWN_CHANGELISTENERS, change_listeners);
};

let oomlHivePrototype = ooml.Hive.prototype;

let global_hive = new ooml.Hive();

ooml.hive = global_hive;
