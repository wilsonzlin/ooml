OOML.Element = function() {};
var OOMLElementProto = OOML.Element.prototype;
OOMLElementProto.toJSON = function(returnUnserialised) {
	var json = {};
	this.__oomlProperties.forEach(function(propName) {
		if (typeof this[propName] != "object") {
			json[propName] = this[propName];
		} else {
			json[propName] = this[propName].toJSON(true);
		}
	});
	return returnUnserialised ? json : JSON.stringify(json);
};
OOMLElementProto.assign = function() {
	var oomlInstance = this;

	for (var i = 0; i < arguments.length; i++) {
		Object.keys(arguments[i]).forEach(function(prop) {
			oomlInstance[prop] = $.clone(arguments[i][prop]);
		});
	}

	return this;
};