OOML.Array = function(elementConstructor, $parentDomElem, nonOomlArray) {
	var internalArray = nonOomlArray ? Utils.merge(nonOomlArray) : [];

	Object.defineProperty(this, OOML_ARRAY_PROPNAME_INTERNALARRAY, {
		value: internalArray,
	});
	Object.defineProperty(this, OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR, {
		value: elementConstructor,
	});
	Object.defineProperty(this, OOML_ARRAY_PROPNAME_PARENTDOMELEM, {
		value: $parentDomElem,
	});
	Object.defineProperty(this, "length", {
		get: function() { return internalArray.length; },
	});
};
var OOMLArrayProto = OOML.Array.prototype;