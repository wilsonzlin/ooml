OOMLArrayProtoMutation.push = function(newVal) {
    let _this = this;
    let arr = _this[OOML_ARRAY_PROPNAME_INTERNALARRAY];
    let insertAfter = arr[arr.length - 1] ?
        arr[arr.length - 1][OOML_INSTANCE_PROPNAME_DOMELEM] :
        _this[OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM];

    let elemConstructor = _this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
    let newElem = Utils.constructElement(elemConstructor, newVal);
    newElem[OOML_INSTANCE_PROPNAME_ATTACH]({ insertAfter: insertAfter, parent: _this });

    arr.push(newElem);

    return _this.length;
};
