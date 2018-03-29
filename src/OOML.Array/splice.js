OOMLArrayProtoMutation.splice = function (start, deleteCount) {
  if (!Utils.isType("natural", start) || !Utils.isType("natural", deleteCount)) {
    throw new TypeError(`Invalid arguments provided to .splice`);
  }

  let _this = this;

  let arr = _this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY];
  let elemConstructor = _this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
  let insertAfter = _this[OOML_ARRAY_PROPNAME_DOM_ANCHOR];

  let toAppend = [];
  let argsToApply = [start, deleteCount];

  for (let i = 2; i < arguments.length; i++) {
    let arg = arguments[i];

    if (arg === undefined) {
      throw new TypeError(`Attempted to add undefined into OOML.Array`);
    }

    let constructedArg = Utils.constructOOMLInstance(elemConstructor, arg);
    argsToApply.push(constructedArg);
    toAppend.push(constructedArg);
  }

  let spliced = Array.prototype.splice.apply(arr, argsToApply);
  spliced.forEach((elem) => {
    if (elem) {
      elem[OOML_INSTANCE_PROPNAME_DETACH]();
    }
  });

  let appendFrom = start ?
    arr[start - 1][OOML_INSTANCE_PROPNAME_DOMELEM] :
    insertAfter;
  toAppend.reduce((previousElem, elem) => {
    elem[OOML_INSTANCE_PROPNAME_ATTACH]({insertAfter: previousElem, parent: _this});
    return elem[OOML_INSTANCE_PROPNAME_DOMELEM];
  }, appendFrom);

  return spliced;
};
