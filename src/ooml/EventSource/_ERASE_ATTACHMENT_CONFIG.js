oomlEventSourcePrototype[__IP_OOML_EVENTSOURCE_PROTO_ERASE_ATTACHMENT_CONFIG] = function () {
  let _this = this;

  let dom_elem = _this[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT];

  if (_this instanceof ooml.Array) {
    // This removes it from the attached instance's DOM (if attached)
    // and moves it back to the internal placeholder DOM parent
    _this[__IP_OOML_ARRAY_OWN_PARKING_PARENT].appendChild(dom_elem);
    _this[__IP_OOML_ARRAY_PROTO_REINSERT_DOM_ELEMENTS]();

  } else {
    // Instances can be attached without being substituted
    if (dom_elem.parentNode) {
      dom_elem.parentNode.removeChild(dom_elem);
    }
  }

  _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE] =
    _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_PROPERTY] = undefined;
};
