(function(undefined) {
	var Utils = {
			querySelectorAll: function(sel) {
				return [].slice.call((this || document).querySelectorAll(sel));
			},
		};

	var OOML = {};

	OOML.init = function() {
		Utils.querySelectorAll('[ooml-class]').forEach(function(elem) {

		});
	};

	OOML.class = function() {

	};
})();