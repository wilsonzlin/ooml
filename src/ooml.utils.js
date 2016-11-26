var Utils = {
	merge: function() {
		var ret = [].slice.call(arguments[0]);
		for (var i = 1; i < arguments.length; i++) {
			ret.push.apply(ret, arguments[i]);
		}
		return ret;
	},
	pushAll: function() {
		var arr = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			arr.push.apply(arr, arguments[i]);
		}
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
		var clonedElem = rootElem.cloneNode();
		if (rootElem[OOML_NODE_PROPNAME_TEXTFORMAT]) clonedElem[OOML_NODE_PROPNAME_TEXTFORMAT] = rootElem[OOML_NODE_PROPNAME_TEXTFORMAT].slice();
		if (rootElem[OOML_NODE_PROPNAME_FORMATPARAMMAP]) clonedElem[OOML_NODE_PROPNAME_FORMATPARAMMAP] = $.clone(rootElem[OOML_NODE_PROPNAME_FORMATPARAMMAP], true);

		if (rootElem.childNodes) {
			for (var i = 0; i < rootElem.childNodes.length; i++) {
				clonedElem.appendChild( cloneElemForInstantiation(rootElem.childNodes[i]) );
			}
		}

		return clonedElem;
	},
};