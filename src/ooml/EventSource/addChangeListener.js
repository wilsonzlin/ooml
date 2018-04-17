oomlEventSourcePrototype.addChangeListener = function (event_name, listener) {
  assert_typeof_r("event name", event_name, TYPEOF_STRING);
  assert_typeof_r("listener", listener, TYPEOF_FUNCTION);

  let _this = this;

  // Normalise event name
  event_name = event_name.toLocaleLowerCase();

  let change_listeners = _this[__IP_OOML_EVENTSOURCE_OWN_CHANGE_LISTENERS];

  if (!change_listeners[event_name]) {
    change_listeners[event_name] = [];
  }
  change_listeners[event_name].push(listener);

  return _this;
};
