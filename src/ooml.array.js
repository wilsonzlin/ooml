OOML.Array = function(elementConstructor, nonOomlArray) {
	var internalArray = nonOomlArray ? Utils.merge(nonOomlArray) : [];

	Object.defineProperty(this, OOML_ARRAY_PROPNAME_INTERNALARRAY, {
		value: internalArray,
	});
	Object.defineProperty(this, OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR, {
		value: elementConstructor,
	});
	Object.defineProperty(this, "length", {
		get: function() { return internalArray.length; },
	});
};
var OOMLArrayProto = OOML.Array.prototype;
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

	instance.__oomlDestruct();


};
OOMLArrayProto.toJSON = function(returnUnserialised, startIdx, endIdx) {

	var arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

	startIdx = startIdx || 0;
	endIdx = endIdx == undefined ? this.length : endIdx;

	var json = [];

	for (var i = startIdx; i < endIdx; i++) {
		json.push(arr[i].toJSON(true));
	}

	return returnUnserialised ? json : JSON.stringify(json);
};