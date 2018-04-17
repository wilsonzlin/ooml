ooml.EventSource = function () {
  let _this = this;

  // Constructor may only be called from descendant classes
  if (!(_this instanceof ooml.EventSource) ||
      Object.getPrototypeOf(_this) == ooml.EventSource.prototype) {
    throw Error(`Illegal constructor invocation`);
  }

  let _this_properties_config = u_new_clean_object();

  _this_properties_config[__IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE] = {
    value: undefined,
    writable: true,
  };
  _this_properties_config[__IP_OOML_EVENTSOURCE_OWN_PARENT_PROPERTY] = {
    value: undefined,
    writable: true,
  };

  _this_properties_config[__IP_OOML_EVENTSOURCE_OWN_DISPATCH_HANDLERS] = {
    value: u_new_clean_object(),
  };
  _this_properties_config[__IP_OOML_EVENTSOURCE_OWN_CHANGE_LISTENERS] = {
    value: u_new_clean_object(),
  };

  u_enumerate(_this_properties_config, (config, prop_name) => {
    Object.defineProperty(_this, prop_name, config);
  });

  // Don't prevent extensions as descendant classes will define more
};

let oomlEventSourcePrototype = ooml.EventSource.prototype;
