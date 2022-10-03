oomlEventSourcePrototype[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_DISPATCH] = function (event_name, event_data) {
  let _this = this;

  // Should not need to normalise or validate event name

  let prevented = false;
  let dispatch_handlers = _this[__IP_OOML_EVENTSOURCE_OWN_DISPATCH_HANDLERS];

  if (dispatch_handlers[event_name]) {
    u_iterate(dispatch_handlers[event_name], handler => {
      let eventObject = {
        preventDefault: () => {
          prevented = true;
        },
        data: event_data,
      };

      if (handler.call(_this, eventObject) === false) {
        prevented = true;
      }
    });
  }

  if (!prevented) {
    let attachment_parent_instance = _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE];
    let attachment_parent_property = _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_PROPERTY];

    if (attachment_parent_instance) {
      attachment_parent_instance[__IP_OOML_EVENTSOURCE_PROTO_RECEIVE_DISPATCH](
        attachment_parent_property,
        event_name,
        event_data);
    }
  }
};
