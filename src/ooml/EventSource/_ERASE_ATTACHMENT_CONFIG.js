oomlEventSourcePrototype[__IP_OOML_EVENTSOURCE_PROTO_ERASE_ATTACHMENT_CONFIG] = function () {
  let _this = this;

  let _this_is_array = _this instanceof ooml.Array;

  let dom_elem = _this[__IP_OOML_INST_OWN_DOM_ELEMENT];

  // Arrays and instances can be attached without being substituted
  // and instances can also be attached to DOM after attaching to parent
  // (e.g. if parent is array and array was attached after this was attached to array)

  _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_INSTANCE] =
    _this[__IP_OOML_EVENTSOURCE_OWN_PARENT_PROPERTY] = undefined;

  if (_this_is_array && _this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR]) {
    _this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR] = undefined;
    __rt_dom_update_add_to_queue(_this, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_ARRUNLOAD);

  } else if (!_this_is_array && dom_elem.parentNode) {
    __rt_dom_update_add_to_queue(dom_elem, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_POTENTIALLYREMOVE);
  }
};
