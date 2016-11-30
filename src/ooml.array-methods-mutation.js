/*
	MUTATION
*/
OOMLArrayProto.initialize = function(arr) {
	var elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR],
		parent = this[OOML_ARRAY_PROPNAME_PARENTDOMELEM];

	arr = arr.map(function(elem) {
		return Utils.constructElement(elemConstructor, elem);
	});

	this[OOML_ARRAY_PROPNAME_INTERNALARRAY].forEach(function(elemToDestruct) {
		elemToDestruct.__oomlDestruct();
	});
	arr.forEach(function(elemToAttach) {
		elemToAttach.__oomlAttach({ appendTo: parent });
	});

	this[OOML_ARRAY_PROPNAME_INTERNALARRAY] = arr;

	return this.length;
};

OOMLArrayProto.pop = function() {
	var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

	var instanceToDetach = arr.pop();
	if (instanceToDetach) {
		instanceToDetach.__oomlDetach();
	}

	return instanceToDetach;
};

OOMLArrayProto.push = function(newVal) {
	var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
		parent = this[OOML_ARRAY_PROPNAME_PARENTDOMELEM];

	var elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
	var newElem = Utils.constructElement(elemConstructor, newVal);
	newElem.__oomlAttach({ appendTo: parent });

	arr.push(newElem);

	return this.length;
};

OOMLArrayProto.reverse = function() {
    var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
        lastElem = arr[arr.length - 1].__oomlDomElem;

    for (var i = 0; i < this.length - 1; i++) {
		var node = arr[i].__oomlDomElem;
        node.parentNode.insertBefore(node, lastElem.nextSibling);
    }

	arr.reverse();

    return this;
};

OOMLArrayProto.shift = function() {
    var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

    var instanceToDetach = arr.shift();
    if (instanceToDetach) {
        instanceToDetach.__oomlDetach();
    }

    return instanceToDetach;
};

OOMLArrayProto.sort = function(propName, ascending) {
	var ascendingMultiplier = ascending ? 1 : -1;

	var sorted = this[OOML_ARRAY_PROPNAME_INTERNALARRAY].sort(function(a, b) {
		if (a[propName] < b[propName]) return -1 * ascendingMultiplier;
		else if (a[propName] === b[propName]) return 0;
		else return 1 * ascendingMultiplier;
	});

	var parentElem = this[OOML_ARRAY_PROPNAME_PARENTDOMELEM];

	sorted.forEach(function(elem) {
		parentElem.appendChild(elem.__oomlDomElem);
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
            elem.__oomlDetach();
        }
    });

    return spliced;
};

OOMLArrayProto.unshift = function(newVal) {
    var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY],
		parent = this[OOML_ARRAY_PROPNAME_PARENTDOMELEM];

	var elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
	var newElem = Utils.constructElement(elemConstructor, newVal);
	newElem.__oomlAttach({ prependTo: parent });

	arr.unshift(newElem);

	return this.length;
};