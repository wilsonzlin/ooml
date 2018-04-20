oomlArrayMutationPrototype.reverse = function () {
  let _this = this;

  _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY].reverse();

  if (_this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR]) {
    __rt_dom_update_add_to_queue(_this, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_ARRREINSERT);
  }

  return _this;
};
