OOMLArrayProtoMutation.sort = function (sorter) {
  let intarray = this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY].sort(sorter);

  let insertAfter = this[OOML_ARRAY_PROPNAME_DOM_ANCHOR];

  intarray.reduce((previousElem, elem) => {
    previousElem.parentNode.insertBefore(elem[OOML_INSTANCE_PROPNAME_DOMELEM], previousElem.nextSibling);
    return elem[OOML_INSTANCE_PROPNAME_DOMELEM];
  }, insertAfter);

  return this;
};

OOMLArrayProtoMutation.sortBy = function (propName, descending) {
  let ascendingMultiplier = descending ?
    -1 :
    1;

  return this.sort((a, b) => {
    if (a[propName] < b[propName]) {
      return -1 * ascendingMultiplier;
    } else if (a[propName] === b[propName]) {
      return 0;
    } else {
      return 1 * ascendingMultiplier;
    }
  });
};
