oomlInstancePrototype.toObject = function () {
  let _this = this;
  let obj = u_new_clean_object();

  let props = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES];

  u_enumerate(props, (prop, prop_name) => {
    if (prop[__BC_CLASSPROP_TRANSIENT]) {
      return;
    }

    let value = _this[prop_name];

    // Use instanceof; don't read from properties configuration or whatever
    if (value instanceof ooml.Array) {
      obj[prop_name] = value.toJSON();

    } else if (value instanceof ooml.Instance) {
      obj[prop_name] = value[__IP_OOML_INST_PROTO_SERIALISE]();

    } else {
      obj[prop_name] = value;
    }
  });

  return obj;
};
