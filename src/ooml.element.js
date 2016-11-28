OOML.Element = function() {};
var OOMLElementProto = OOML.Element.prototype;
OOMLElementProto.toObject = function() {

	var instance = this;
	var obj = {};

	this.constructor.__oomlProperties.forEach(function(propName) {
		if (typeof instance[propName] != "object") {
			obj[propName] = instance[propName];
		} else {
			obj[propName] = instance[propName].toObject();
		}
	});

	return obj;
};
OOMLElementProto.toJSON = function() {
	return JSON.stringify(this.toObject());
};
OOMLElementProto.assign = function() {
	var oomlInstance = this;

	for (var i = 0; i < arguments.length; i++) {

		var source = arguments[i];

		Object.keys(source).forEach(function(prop) {
			oomlInstance[prop] = $.clone(source[prop]);
		});
	}

	return this;
};
if (typeof Symbol == "function") {
	OOMLElementProto[Symbol.iterator] = function() {
		var i = -1,
			inst = this,
			objectKeys = this.constructor.__oomlProperties;

		return {
			next: function() {
				if (++i == objectKeys.length) {
					return { done: true };
				}

				return { value: inst[objectKeys[i]], done: false };
			}
		};
	};
}