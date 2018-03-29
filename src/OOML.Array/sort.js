OOMLArrayProtoMutation.sort = function (propName, ascending) {
  if (ascending == undefined) {
    ascending = true;
  }
  let ascendingMultiplier = ascending ?
    1 :
    -1;

  let sorted = this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY].sort((a, b) => {
    if (a[propName] < b[propName]) {
      return -1 * ascendingMultiplier;
    } else if (a[propName] === b[propName]) {
      return 0;
    } else {
      return 1 * ascendingMultiplier;
    }
  });

  let insertAfter = this[OOML_ARRAY_PROPNAME_DOM_ANCHOR];

  sorted.reduce((previousElem, elem) => {
    previousElem.parentNode.insertBefore(elem[OOML_INSTANCE_PROPNAME_DOMELEM], previousElem.nextSibling);
    return elem[OOML_INSTANCE_PROPNAME_DOMELEM];
  }, insertAfter);

  this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY] = sorted;
};
