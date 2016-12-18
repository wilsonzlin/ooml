/*
	MUTATION
*/
OOMLArrayProto.initialize = function(arr) {
	var elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR],
		parent = this[OOML_ARRAY_PROPNAME_PARENTDOMELEM],
		that = this;

	arr = arr.map(function(elem) {
		return Utils.constructElement(elemConstructor, elem);
	});

	this[OOML_ARRAY_PROPNAME_INTERNALARRAY].forEach(function(elemToDestruct) {
		elemToDestruct[OOML_ELEMENT_PROPNAME_DESTRUCT]();
	});
	arr.forEach(function(elemToAttach) {
		elemToAttach[OOML_ELEMENT_PROPNAME_ATTACH]({ appendTo: parent, parent: that });
	});

	this[OOML_ARRAY_PROPNAME_INTERNALARRAY] = arr;

	return this;
};

OOMLArrayProto.pop = function() {
	var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

	var instanceToDetach = arr.pop();
	if (instanceToDetach) {
		instanceToDetach[OOML_ELEMENT_PROPNAME_DETACH]();
	}

	return instanceToDetach;
};

OOMLArrayProto.push = function(newVal) {
	var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
		parent = this[OOML_ARRAY_PROPNAME_PARENTDOMELEM];

	var elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
	var newElem = Utils.constructElement(elemConstructor, newVal);
	newElem[OOML_ELEMENT_PROPNAME_ATTACH]({ appendTo: parent, parent: this });

	arr.push(newElem);

	return this.length;
};

OOMLArrayProto.reverse = function() {
    var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
        lastElem = arr[arr.length - 1][OOML_ELEMENT_PROPNAME_DOMELEM];

    for (var i = 0; i < this.length - 1; i++) {
		var node = arr[i][OOML_ELEMENT_PROPNAME_DOMELEM];
        node.parentNode.insertBefore(node, lastElem.nextSibling);
    }

	arr.reverse();

    return this;
};

OOMLArrayProto.shift = function() {
    var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

    var instanceToDetach = arr.shift();
    if (instanceToDetach) {
        instanceToDetach[OOML_ELEMENT_PROPNAME_DETACH]();
    }

    return instanceToDetach;
};

OOMLArrayProto.sort = function(propName, ascending) {
	if (ascending == undefined) {
		ascending = true;
	}
	var ascendingMultiplier = ascending ? 1 : -1;

	var sorted = this[OOML_ARRAY_PROPNAME_INTERNALARRAY].sort(function(a, b) {
		if (a[propName] < b[propName]) return -1 * ascendingMultiplier;
		else if (a[propName] === b[propName]) return 0;
		else return 1 * ascendingMultiplier;
	});

	var parentElem = this[OOML_ARRAY_PROPNAME_PARENTDOMELEM];

	sorted.forEach(function(elem) {
		parentElem.appendChild(elem[OOML_ELEMENT_PROPNAME_DOMELEM]);
	});

	this[OOML_ARRAY_PROPNAME_INTERNALARRAY] = sorted;
};

OOMLArrayProto.splice = function(start, deleteCount) {
    var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
        elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];

    for (var i = 2; i < arguments.length; i++) {
        arguments[i] = Utils.constructElement(elemConstructor, arguments[i]);
    }

    var spliced = Array.prototype.splice.apply(arr, arguments);
    spliced.forEach(function(elem) {
        if (elem) {
            elem[OOML_ELEMENT_PROPNAME_DETACH]();
        }
    });

    return spliced;
};

OOMLArrayProto.unshift = function(newVal) {
    var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
		parent = this[OOML_ARRAY_PROPNAME_PARENTDOMELEM];

	var elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
	var newElem = Utils.constructElement(elemConstructor, newVal);
	newElem[OOML_ELEMENT_PROPNAME_ATTACH]({ prependTo: parent, parent: this });

	arr.unshift(newElem);

	return this.length;
};