oomlArrayMutationPrototype.reverse = function () {
  let _this = this;

  let arr = _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];
  let last_elem = arr[arr.length - 1][__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT];

  for (let i = 0; i < arr.length - 1; i++) {
    let node = arr[i][__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT];
    node.parentNode.insertBefore(node, last_elem.nextSibling);
  }

  arr.reverse();

  return _this;
};
