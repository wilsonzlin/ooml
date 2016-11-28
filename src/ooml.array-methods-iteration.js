/*
    ITERATION
*/
OOMLArrayProto.every = function() {};
OOMLArrayProto.find = function() {};
OOMLArrayProto.findIndex = function() {};
OOMLArrayProto.forEach = function() {};
OOMLArrayProto.map = function() {};
OOMLArrayProto.reduce = function() {};
OOMLArrayProto.reduceRight = function() {};
OOMLArrayProto.some = function() {};
if (typeof Symbol == "function") {
	OOMLElementProto[Symbol.iterator] = function() {
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