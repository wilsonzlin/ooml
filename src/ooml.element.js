OOML.Element = function() {};
var OOMLElementProto = OOML.Element.prototype;
OOMLElementProto.toJSON = function(returnUnserialised) {

	var instance = this;
	var json = {};

	this.__oomlProperties.forEach(function(propName) {
		if (typeof instance[propName] != "object") {
			json[propName] = instance[propName];
		} else {
			json[propName] = instance[propName].toJSON(true);
		}
	});
	return returnUnserialised ? json : JSON.stringify(json);
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