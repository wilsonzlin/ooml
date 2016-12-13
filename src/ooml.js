(function(undefined) {
	"use strict";

	var OOMLNodesWithUnwrittenChanges = new Set(),
		OOMLWriteChangesSetTimeout,
		OOMLWriteChanges = function() {
			if (OOMLWriteChangesSetTimeout) clearTimeout(OOMLWriteChangesSetTimeout);
			OOMLWriteChangesSetTimeout = setTimeout(function() {
				OOMLNodesWithUnwrittenChanges.forEach(function(node) {
					node.nodeValue = node[OOML_NODE_PROPNAME_TEXTFORMAT].join('');
				});

				OOMLNodesWithUnwrittenChanges.clear();
			}, 50);
		};

	var OOMLInstanceDestructedError = function() {
		throw new Error('This instance is no longer available to use');
	};

	var OOML_ARRAY_PROPNAME_INTERNALARRAY = '__oomlInternalArray',
		OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR = '__oomlElementConstructor',
		OOML_ARRAY_PROPNAME_PARENTDOMELEM = '__oomlContainerDOMElem',

		OOML_NODE_PROPNAME_TEXTFORMAT = '__oomlFormatStr',
		OOML_NODE_PROPNAME_FORMATPARAMMAP = '__oomlParamMap',
		OOML_NODE_PROPNAME_GENERICEVENTHANDLERS = '__oomlGenericEventHandlers',
		OOML_NODE_PROPNAME_CHILDEVENTHANDLERS = '__oomlChildEventHandlers',
		OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG = '__oomlIsElemPropertyContainer';

	<ZC-IMPORT[utils]>

	var OOML = {};
	<ZC-IMPORT[array]>
	<ZC-IMPORT[array-methods-getset]>
	<ZC-IMPORT[array-methods-mutation]>
	<ZC-IMPORT[array-methods-access]>
	<ZC-IMPORT[array-methods-iteration]>
	<ZC-IMPORT[element]>
	<ZC-IMPORT[init]>

	if (typeof exports == "object") {
		module.exports = OOML;
	} else {
		window.OOML = OOML;
	}
})();