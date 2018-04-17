oomlArrayMutationPrototype.reverse = function () {
  let _this = this;

  let arr = _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];
  let last_elem = arr[arr.length - 1][__IP_OOML_INST_OWN_DOM_ELEM];

  for (let i = 0; i < arr.length - 1; i++) {
    let node = arr[i][__IP_OOML_INST_OWN_DOM_ELEM];
    node.parentNode.insertBefore(node, last_elem.nextSibling);
  }

  arr.reverse();

  return _this;
};
