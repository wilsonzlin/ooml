oomlEventSourcePrototype.addDispatchHandler = function (event_name, handler) {
  assert_valid_r("event name", event_name, valid_dispatch_event_name);
  assert_typeof_r("handler", handler, TYPEOF_FUNCTION);

  let _this = this;

  // Normalise event name
  event_name = event_name.toLocaleLowerCase();

  let dispatch_handlers = _this[__IP_OOML_EVENTSOURCE_OWN_DISPATCH_HANDLERS];

  if (!dispatch_handlers[event_name]) {
    dispatch_handlers[event_name] = [];
  }
  dispatch_handlers[event_name].push(handler);

  return _this;
};
