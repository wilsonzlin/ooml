oomlTablePrototype[__IP_OOML_EVENTSOURCE_PROTO_RECEIVE_DISPATCH] = function (_, event_name, event_data) {
  // When array receives dispatch event from element,
  // immediately forward to parent
  this[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_DISPATCH](event_name, event_data);
};
