ooml.Exposition = function () {
  let _this = this;

  if (!(_this instanceof ooml.Exposition)) {
    throw TypeError(`Illegal constructor invocation`);
  }

  u_define_data_property(_this, __IP_OOML_EXPO_OWN_NODES, []);
  u_define_data_property(_this, __IP_OOML_EXPO_OWN_RENDERINGID_NODEIDXS_MAP, []);
};

let oomlExpositionPrototype = ooml.Exposition.prototype;
