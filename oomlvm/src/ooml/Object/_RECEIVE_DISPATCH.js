oomlObjectPrototype[__IP_OOML_EVENTSOURCE_PROTO_RECEIVE_DISPATCH] = function (prop_name, event_name, event_data) {
  // When instance receives dispatch event from instance or array property,
  // call any handlers on property
  let _this = this;

  let prop = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES][prop_name];

  if (prop[__BC_CLASSPROP_DISPATCHHANDLERS][event_name]) {
    let method_name = prop[__BC_CLASSPROP_DISPATCHHANDLERS][event_name];
    _this[method_name](event_data);
  }
};
