(function(undefined) {
	var OOMLNodesWithUnwrittenChanges = new Set(),
		OOMLWriteChangesSetTimeout,
		OOMLWriteChanges = function() {
			if (OOMLWriteChangesSetTimeout) clearTimeout(OOMLWriteChangesSetTimeout);
			OOMLWriteChangesSetTimeout = setTimeout(function() {
				OOMLNodesWithUnwrittenChanges.forEach(function(node) {
					node.textContent = node.__oomlFormatStr.join('');
				});

				OOMLNodesWithUnwrittenChanges.clear();
			}, 50);
		};

	<ZC-IMPORT[utils]>

	var OOML = {};
	<ZC-IMPORT[array]>
	<ZC-IMPORT[element]>
	<ZC-IMPORT[init]>

	if (typeof exports == "object") {
		module.exports = OOML;
	} else {
		window.OOML = OOML;
	}
})();