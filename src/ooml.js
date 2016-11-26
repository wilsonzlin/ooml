(function(undefined) {
	var OOMLNodesWithUnwrittenChanges = new Set(),
		OOMLWriteChangesSetTimeout,
		OOMLWriteChanges = function() {
			if (OOMLWriteChangesSetTimeout) clearTimeout(OOMLWriteChangesSetTimeout);
			OOMLWriteChangesSetTimeout = setTimeout(function() {
				OOMLNodesWithUnwrittenChanges.forEach(function(node) {
					node.textContent = node[OOML_NODE_PROPNAME_TEXTFORMAT].join('');
				});

				OOMLNodesWithUnwrittenChanges.clear();
			}, 50);
		};

	var OOML_NODE_PROPNAME_TEXTFORMAT = '__oomlFormatStr',
		OOML_NODE_PROPNAME_FORMATPARAMMAP = '__oomlParamMap';

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