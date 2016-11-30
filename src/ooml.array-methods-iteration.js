/*
    ITERATION
*/
['every', 'find', 'findIndex', 'forEach', 'map', 'reduce', 'reduceRight', 'some'].forEach(function(method) {
	OOMLArrayProto[method] = function() {
		return Array.prototype[method].apply(this[OOML_ARRAY_PROPNAME_INTERNALARRAY], arguments);
	};
});
if (typeof Symbol == "function") {
	OOMLArrayProto[Symbol.iterator] = function() {
		var i = -1,
			arr = this[OOML_ARRAY_PROPNAME_INTERNALARRAY];

		return {
			next: function() {
				if (++i == arr.length) {
					return { done: true };
				}

				return { value: arr[i], done: false };
			}
		};
	};
}