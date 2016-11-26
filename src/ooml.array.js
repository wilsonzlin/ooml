var OOML_ARRAY_PROPNAME_INTERNALARRAY = '__oomlInternalArray';
OOML.Array = function(nonOomlArray) {
	var internalArray = nonOomlArray ? Utils.merge(nonOomlArray) : [];
	this[OOML_ARRAY_PROPNAME_INTERNALARRAY] = internalArray;

	Object.defineProperties(this, {
		"length": {
			configurable: false,
			enumerable: false,
			writable: false,
			get: function() { return internalArray.length; },
		},
	});
};
var OOMLArrayProto = OOML.Array.prototype;