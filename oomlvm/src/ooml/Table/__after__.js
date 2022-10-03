u_enumerate(oomlTableMutationPrototype, (method, method_name) => {
  oomlTablePrototype[method_name] = function () {
    let _this = this;

    let length_before = _this.length;

    // Call function
    let rv = method.apply(_this, arguments);

    let length_after = _this.length;

    let change_event_data = {
      methodName: method_name,
      oldLength: length_before,
      newLength: length_after,
    };

    // Call change event listeners for method name
    _this[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_CHANGE](method_name.toLowerCase(), change_event_data);

    // Call resize change event listeners
    if (length_before != length_after) {
      _this[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_CHANGE]("resize", change_event_data);
    }

    // Call general change event listeners
    _this[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_CHANGE]("update", change_event_data);

    // Return the return value
    return rv;
  };
});
