ooml.EventSource = function () {
  let _this = this;

  // Constructor may only be called from descendant classes
  if (!(_this instanceof ooml.EventSource) ||
      Object.getPrototypeOf(_this) == ooml.EventSource.prototype) {
    throw TypeError(`Illegal constructor invocation`);
  }

  u_define_data_property(_this, __IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE, undefined, true);
  u_define_data_property(_this, __IP_OOML_EVENTSOURCE_OWN_PARENT_PROPERTY, undefined, true);

  u_define_data_property(_this, __IP_OOML_EVENTSOURCE_OWN_DISPATCH_HANDLERS, u_new_clean_object());
  u_define_data_property(_this, __IP_OOML_EVENTSOURCE_OWN_CHANGE_LISTENERS, u_new_clean_object());

  // Don't prevent extensions as descendant classes will define more
};

let oomlEventSourcePrototype = ooml.EventSource.prototype;
