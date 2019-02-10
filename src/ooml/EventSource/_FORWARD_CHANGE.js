oomlEventSourcePrototype[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_CHANGE] = function (event_name, event_data) {
  let _this = this;

  // Should not need to normalise or validate event name

  let change_listeners = _this[__IP_OOML_EVENTSOURCE_OWN_CHANGE_LISTENERS];

  if (change_listeners[event_name]) {
    u_iterate(change_listeners[event_name], handler => {
      handler.call(_this, event_data);
    });
  }
};
