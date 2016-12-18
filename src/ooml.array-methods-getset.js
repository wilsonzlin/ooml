/*
	SETTER AND GETTER
*/
OOMLArrayProto.get = function(idx) {
	var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

	var realIdx = idx;
	if (idx < 0) {
		realIdx = this.length + idx;
	}

	var instance = arr[realIdx];
	if (!instance) {
		throw new RangeError('The offset at index ' + idx + ' is not a valid offset');
	}

	return instance;
};

// Elem has to already exist at the index/offset
OOMLArrayProto.set = function(idx, newVal) {
	var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

	var realIdx = idx;
	if (idx < 0) {
		realIdx = this.length + idx;
	}

	var instance = arr[realIdx];
	if (!instance && idx !== this.length) {
		throw new RangeError('The offset at index ' + idx + ' is not a valid offset');
	}

	var elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
	var newElem = Utils.constructElement(elemConstructor, newVal);
	// Attach first to ensure that elem is attachable
	newElem[OOML_ELEMENT_PROPNAME_ATTACH]({
		insertAfter: instance[OOML_ELEMENT_PROPNAME_DOMELEM],
		parent: this,
	});

	// Destroy after attaching new elem
	instance[OOML_ELEMENT_PROPNAME_DESTRUCT]();

	arr[realIdx] = newElem;

	return newElem;
};