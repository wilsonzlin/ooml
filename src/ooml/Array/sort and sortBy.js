oomlArrayMutationPrototype.sort = function (sorter) {
  let _this = this;

  _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY].sort(sorter);

  if (_this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR]) {
    __rt_dom_update_add_to_queue(_this, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_ARRREINSERT);
  }

  return this;
};

// Don't assign sortBy to mutation prototype
// as it should trigger "sort" event, not "sort" and "sortBy"
oomlArrayPrototype.sortBy = function (propName, descending) {
  let ascendingMultiplier = descending ?
    -1 :
    1;

  return this.sort((a, b) => {
    if (a[propName] < b[propName]) {
      return -1 * ascendingMultiplier;
    } else if (a[propName] === b[propName]) {
      return 0;
    } else {
      return ascendingMultiplier;
    }
  });
};
