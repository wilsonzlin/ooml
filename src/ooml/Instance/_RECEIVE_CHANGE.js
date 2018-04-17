oomlInstancePrototype[__IP_OOML_EVENTSOURCE_PROTO_RECEIVE_CHANGE] = function (prop_name, event_name, event_data) {
  // When instance receives change event from instance or array property,
  // call any change listeners on property if event name is "change"
  if (event_name == "change") {
    let _this = this;

    let prop = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES][prop_name];

    u_iterate(prop[__BC_CLASSPROP_CHANGE], method_name => {
      _this[method_name](event_data);
    });
  }
};
