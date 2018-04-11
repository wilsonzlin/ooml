OOMLArrayProtoMutation.push = function (newVal) {
  if (newVal === undefined) {
    throw TypeError(`Attempted to add undefined into OOML.Array`);
  }

  let _this = this;
  let arr = _this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY];
  let insertAfter = arr.length ?
    arr[arr.length - 1][OOML_INSTANCE_PROPNAME_DOMELEM] :
    _this[OOML_ARRAY_PROPNAME_DOM_ANCHOR];

  let elemConstructor = _this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
  let newElem = Utils_constructOOMLInstance(elemConstructor, newVal);
  newElem[OOML_INSTANCE_PROPNAME_ATTACH]({insertAfter: insertAfter, parent: _this});

  arr.push(newElem);

  return _this.length;
};
