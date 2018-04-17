oomlEventSourcePrototype[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_CHANGE] = function (event_name, event_data) {
  let _this = this;

  // Should not need to normalise or validate event name

  let change_listeners = _this[__IP_OOML_EVENTSOURCE_OWN_CHANGE_LISTENERS];

  if (change_listeners[event_name]) {
    u_iterate(change_listeners[event_name], handler => {
      let eventObject = {
        data: event_data,
      };

      handler.call(_this, eventObject);
    });
  }

  let attachment_parent_instance = _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE];
  let attachment_parent_property = _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_PROPERTY];

  if (attachment_parent_instance) {
    attachment_parent_instance[__IP_OOML_EVENTSOURCE_PROTO_RECEIVE_CHANGE](
      attachment_parent_property,
      event_name,
      event_data);
  }
};
