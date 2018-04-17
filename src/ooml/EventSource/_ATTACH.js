oomlEventSourcePrototype[__IP_OOML_EVENTSOURCE_PROTO_ATTACH] = function (parent, property, anchor) {
  let _this = this;

  let dom_element = _this[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT];

  if (_this[__IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE]) {
    // Even though this is an internal function, it is called when assigning this to a
    // property, which is external logic, so this exception should have an appropriate
    // type and message
    throw ReferenceError(`Already attached`);
  }

  _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE] = parent;
  _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_PROPERTY] = property;

  // It's possible for an instance to have an array or instance property
  // but not substitute it into the view
  if (anchor) {
    anchor.parentNode.insertBefore(dom_element, anchor.nextSibling);
  }
};
