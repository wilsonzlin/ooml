oomlEventSourcePrototype.dispatch = function (event_name, event_data) {
  assert_valid_r("event name", event_name, valid_dispatch_event_name);
  event_name = event_name.toLocaleLowerCase();

  // Forward event to parent
  this[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_DISPATCH](event_name, event_data);
};
