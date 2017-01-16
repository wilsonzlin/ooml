/*
    MUTATION
*/
let OOMLArrayProtoMutation = Utils.createCleanObject();
OOMLArrayProtoMutation.initialize = function(arr) {
    let _this = this;
    let elemConstructor = _this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
    let insertAfter = _this[OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM];

    arr = arr.map(elem => Utils.constructElement(elemConstructor, elem));

    _this[OOML_ARRAY_PROPNAME_INTERNALARRAY].forEach(elemToDetach => elemToDetach[OOML_INSTANCE_PROPNAME_DETACH]());

    arr.reduce((previousElem, elemToAttach) => {
        elemToAttach[OOML_INSTANCE_PROPNAME_ATTACH]({ insertAfter: previousElem, parent: _this });
        return elemToAttach[OOML_INSTANCE_PROPNAME_DOMELEM];
    }, insertAfter);

    _this[OOML_ARRAY_PROPNAME_INTERNALARRAY] = arr;

    return _this;
};

OOMLArrayProtoMutation.pop = function() {
    let arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

    let instanceToDetach = arr.pop();
    if (instanceToDetach) {
        instanceToDetach[OOML_INSTANCE_PROPNAME_DETACH]();
    }

    return instanceToDetach;
};

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

OOMLArrayProtoMutation.reverse = function() {
    let arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];
    let lastElem = arr[arr.length - 1][OOML_INSTANCE_PROPNAME_DOMELEM];

    for (let i = 0; i < arr.length - 1; i++) {
        let node = arr[i][OOML_INSTANCE_PROPNAME_DOMELEM];
        node.parentNode.insertBefore(node, lastElem.nextSibling);
    }

    arr.reverse();

    return this;
};

OOMLArrayProtoMutation.shift = function() {
    let arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

    let instanceToDetach = arr.shift();
    if (instanceToDetach) {
        instanceToDetach[OOML_INSTANCE_PROPNAME_DETACH]();
    }

    return instanceToDetach;
};

OOMLArrayProtoMutation.sort = function(propName, ascending) {
    if (ascending == undefined) {
        ascending = true;
    }
    let ascendingMultiplier = ascending ? 1 : -1;

    let sorted = this[OOML_ARRAY_PROPNAME_INTERNALARRAY].sort((a, b) => {
        if (a[propName] < b[propName]) {
            return -1 * ascendingMultiplier;
        } else if (a[propName] === b[propName]) {
            return 0;
        } else {
            return 1 * ascendingMultiplier;
        }
    });

    let insertAfter = this[OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM];

    sorted.reduce((previousElem, elem) => {
        previousElem.parentNode.insertBefore(elem[OOML_INSTANCE_PROPNAME_DOMELEM], previousElem.nextSibling);
        return elem[OOML_INSTANCE_PROPNAME_DOMELEM];
    }, insertAfter);

    this[OOML_ARRAY_PROPNAME_INTERNALARRAY] = sorted;
};

OOMLArrayProtoMutation.splice = function(start, deleteCount) {
    let arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
        elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];

    for (let i = 2; i < arguments.length; i++) {
        arguments[i] = Utils.constructElement(elemConstructor, arguments[i]);
    }

    let spliced = Array.prototype.splice.apply(arr, arguments);
    spliced.forEach((elem) => {
        if (elem) {
            elem[OOML_INSTANCE_PROPNAME_DETACH]();
        }
    });

    return spliced;
};

OOMLArrayProtoMutation.unshift = function(newVal) {
    let arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
        insertAfter = this[OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM];

    let elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
    let newElem = Utils.constructElement(elemConstructor, newVal);
    newElem[OOML_INSTANCE_PROPNAME_ATTACH]({ insertAfter: insertAfter, parent: this });

    arr.unshift(newElem);

    return this.length;
};
for (let methodName in OOMLArrayProtoMutation) {
    OOMLArrayProto[methodName] = function() {
        let _this = this;
        OOMLArrayProtoMutation[methodName].apply(_this, arguments);
        _this[OOML_ARRAY_PROPNAME_MUTATIONEVENTLISTENERS].arraychange.forEach(handler => {
            handler.call(_this);
        });
    };
}
