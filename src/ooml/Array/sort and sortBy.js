oomlArrayMutationPrototype.sort = function (sorter) {
  this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY].sort(sorter);

  this[__IP_OOML_ARRAY_PROTO_REINSERT_DOM_ELEMENTS]();

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
