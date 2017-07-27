OOMLArrayProtoMutation.splice = function(start, deleteCount) {
    if (!Utils.isType('natural', start) || !Utils.isType('natural', deleteCount)) {
        throw new TypeError(`Invalid arguments provided to .splice`);
    }
    let _this = this,
        arr = _this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
        elemConstructor = _this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR],
        insertAfter = _this[OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM],
        toAppend = [];

    for (let i = 2; i < arguments.length; i++) {
        arguments[i] = Utils.constructElement(elemConstructor, arguments[i]);
        toAppend.push(arguments[i]);
    }

    let spliced = Array.prototype.splice.apply(arr, arguments);
    spliced.forEach((elem) => {
        if (elem) {
            elem[OOML_INSTANCE_PROPNAME_DETACH]();
        }
    });

    let appendFrom = start ? arr[start - 1][OOML_INSTANCE_PROPNAME_DOMELEM] : insertAfter;
    toAppend.reduce((previousElem, elem) => {
        elem[OOML_INSTANCE_PROPNAME_ATTACH]({ insertAfter: previousElem, parent: _this });
        return elem[OOML_INSTANCE_PROPNAME_DOMELEM];
    }, appendFrom);

    return spliced;
};
