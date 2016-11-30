(function(undefined) {
	"use strict";

	var OOMLCompatBrowserIsIE = navigator.userAgent.indexOf('Trident') > -1,
		OOMLCompatBrowserIsIE10OrLess = OOMLCompatBrowserIsIE && navigator.userAgent.indexOf('rv') == -1;

	var NodeSet;
	if (OOMLCompatBrowserIsIE10OrLess) {
		var NodeSetIdCounter = 0,
			NODESET_NODE_PROPNAME_ID = '__nodesetId';

		NodeSet = function() {
			var instance = this;

			var internalMap = Object.create(null);
			// Don't have an additional internal array for easier iteration as deletion would be difficult

			this.__internalMap = internalMap;
			this.size = 0;
			this.clear = function() {
				internalMap = Object.create(null);
				instance.size = 0;
			};
		};
		var NodeSetPrototype = NodeSet.prototype;
		NodeSetPrototype.add = function(node) {
			if (!node[NODESET_NODE_PROPNAME_ID] || !this.__internalMap[node[NODESET_NODE_PROPNAME_ID]]) {
				if (!node[NODESET_NODE_PROPNAME_ID]) node[NODESET_NODE_PROPNAME_ID] = ++NodeSetIdCounter;

				this.__internalMap[node[NODESET_NODE_PROPNAME_ID]] = node;
				this.size++;
			}
			return this;
		};
		NodeSetPrototype.delete = function(node) {
			if (this.__internalMap[node[NODESET_NODE_PROPNAME_ID]]) {
				delete this.__internalMap[node[NODESET_NODE_PROPNAME_ID]];
				this.size--;
				return true;
			}
			return false;
		};
		NodeSetPrototype.forEach = function(callback) {
			for (var prop in this.__internalMap) {
				var node = this.__internalMap[prop];
				callback(node, node, this);
			}
		};
	} else {
		NodeSet = Set;
	}

	var OOMLNodesWithUnwrittenChanges = new NodeSet(),
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