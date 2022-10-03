oomlTableMutationPrototype.sort = function (sorter) {
  let _this = this;

  _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY].sort(sorter);

  if (_this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR]) {
    __rt_dom_update_add_to_queue(_this, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_ARRREINSERT);
  }

  return this;
};

// Don't assign sortBy to mutation prototype
// as it should trigger "sort" event, not "sort" and "sortBy"
oomlTablePrototype.sortBy = function (prop_name, descending) {
  let _this = this;

  if (!_this[__IP_OOML_ARRAY_OWN_ELEMENT_TYPE][__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES][prop_name]) {
    throw ReferenceError(`Non-existent property name "${prop_name}" to sort by`);
  }

  let ascendingMultiplier = descending ?
    -1 :
    1;

  return _this.sort((a, b) => {
    if (a[prop_name] < b[prop_name]) {
      return -1 * ascendingMultiplier;
    } else if (a[prop_name] === b[prop_name]) {
      return 0;
    } else {
      return ascendingMultiplier;
    }
  });
};
