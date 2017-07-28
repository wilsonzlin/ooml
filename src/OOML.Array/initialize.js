OOMLArrayProtoMutation.initialize = function(arr) {
    let _this = this;
    let elemConstructor = _this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
    let insertAfter = _this[OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM];

    arr = arr.map(elem => Utils.constructOOMLElementInstance(elemConstructor, elem));

    _this[OOML_ARRAY_PROPNAME_INTERNALARRAY].forEach(elemToDetach => elemToDetach[OOML_INSTANCE_PROPNAME_DETACH]());

    arr.reduce((previousElem, elemToAttach) => {
        elemToAttach[OOML_INSTANCE_PROPNAME_ATTACH]({ insertAfter: previousElem, parent: _this });
        return elemToAttach[OOML_INSTANCE_PROPNAME_DOMELEM];
    }, insertAfter);

    _this[OOML_ARRAY_PROPNAME_INTERNALARRAY] = arr;

    return _this;
};
