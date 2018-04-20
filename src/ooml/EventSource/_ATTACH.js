oomlEventSourcePrototype[__IP_OOML_EVENTSOURCE_PROTO_ATTACH] = function (parent, property, anchor) {
  let _this = this;

  let _this_is_array = _this instanceof ooml.Array;

  if (_this[__IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE]) {
    // Even though this is an internal function, it is called when
    // assigning this to a property and adding to an array, which are public APIs,
    // so this exception should have an appropriate type and message
    throw ReferenceError(`Already attached`);
  }

  let dom_elem = _this[__IP_OOML_INST_OWN_DOM_ELEMENT];

  _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE] = parent;
  _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_PROPERTY] = property;

  // It's possible for an instance to have an array or instance property
  // but not substitute it into the view
  if (anchor) {
    if (_this_is_array) {
      _this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR] = anchor;
      __rt_dom_update_add_to_queue(_this, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_ARRREINSERT);

    } else {
      __rt_dom_update_add_to_queue(dom_elem, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_INSERTAFTER, anchor);
    }
  }
};
