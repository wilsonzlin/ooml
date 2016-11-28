var Utils = {
	merge: function() {
		var ret = [].slice.call(arguments[0]);
		for (var i = 1; i < arguments.length; i++) {
			Array.prototype.push.apply(ret, arguments[i]);
		}
		return ret;
	},
	pushAll: function() {
		var arr = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			Array.prototype.push.apply(arr, arguments[i]);
		}
	},
	isObjectLiteral: function(obj) {
		return obj.constructor == Object;
	},
	constructElement: function(elemConstructor, obj) {
		if (obj instanceof elemConstructor) {
			return obj;
		} else if (!Utils.isObjectLiteral(obj)) {
			throw new TypeError('Unable to construct new instance; the provided object is not of the correct type');
		}

		return new elemConstructor(newVal);
	},
	splitStringByParamholders: function(str) {
		var strParts = [],
			paramMap = Object.create(null);

		while (true) {
			var posOfOpeningBraces = str.indexOf('{{');
			if (posOfOpeningBraces < 0) {
				if (str) strParts.push(str);
				break;
			}
			var strBeforeParam = str.slice(0, posOfOpeningBraces);
			if (strBeforeParam) strParts.push(strBeforeParam);
			str = str.slice(posOfOpeningBraces + 2);

			var posOfClosingBraces = str.indexOf('}}');
			if (posOfClosingBraces < 0) {
				throw new SyntaxError("Unexpected end of input; expected closing text parameter braces");
			}
			var param = str.slice(0, posOfClosingBraces).trim();
			// Assume param is a well-formatted JS property name
			if (!paramMap[param]) paramMap[param] = [];
			paramMap[param].push(strParts.length);
			strParts.push('');

			str = str.slice(posOfClosingBraces + 2);
		}

		return {
			parts: strParts,
			map: paramMap,
		};
	},
	cloneElemForInstantiation: function cloneElemForInstantiation(rootElem) {
		if (rootElem instanceof Element) {

			var clonedElem = document.createElement(rootElem.nodeName);

			for (var i = 0; i < rootElem.attributes.length; i++) {
				var rootAttr = rootElem.attributes[i];
				var clonedAttr = document.createAttribute(rootAttr.name);
				clonedAttr.nodeValue = rootAttr.nodeValue;

				if (rootAttr[OOML_NODE_PROPNAME_TEXTFORMAT]) {
					clonedAttr[OOML_NODE_PROPNAME_TEXTFORMAT] = rootAttr[OOML_NODE_PROPNAME_TEXTFORMAT].slice();
				}
				if (rootAttr[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
					clonedAttr[OOML_NODE_PROPNAME_FORMATPARAMMAP] = $.clone(rootAttr[OOML_NODE_PROPNAME_FORMATPARAMMAP], true);
				}

				clonedElem.setAttributeNode(clonedAttr);
			}

			for (var i = 0; i < rootElem.childNodes.length; i++) {
				clonedElem.appendChild( cloneElemForInstantiation(rootElem.childNodes[i]) );
			}

		} else if (rootElem instanceof Text) {

			var clonedElem = document.createTextNode(rootElem.nodeValue);
			if (rootElem[OOML_NODE_PROPNAME_TEXTFORMAT]) {
				clonedElem[OOML_NODE_PROPNAME_TEXTFORMAT] = rootElem[OOML_NODE_PROPNAME_TEXTFORMAT].slice();
			}
			if (rootElem[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
				clonedElem[OOML_NODE_PROPNAME_FORMATPARAMMAP] = $.clone(rootElem[OOML_NODE_PROPNAME_FORMATPARAMMAP], true);
			}

		}

		return clonedElem;
	},
};