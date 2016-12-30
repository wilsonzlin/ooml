var Utils = {
    DOM: {
        find: function(rootElem, sel) {
            return Utils.merge(rootElem.querySelectorAll(sel));
        },
        setData: function(domElem, key, value) {
            if (OOMLCompatDatasetExists) {
                domElem.dataset[key] = value;
            } else {
                domElem.setAttribute('data-' + Utils.toDashCase(key), value);
            }
        },
    },
    toDashCase: function(str) {
        return str.replace(/^[a-z]+|(?!^)(?:[A-Z][a-z]*)/g, function(match) {
            return match.toLowerCase() + '-';
        }).slice(0, -1);
    },
    getEvalValue: function(codeStr) {
        codeStr = codeStr.trim() || undefined;
        return eval('(' + codeStr + ')');
    },
    merge: function() {
        // WARNING: Don't use .concat as that doesn't work with array-like objects
        // e.g. [].concat(NodeList(div, span)) becomes [NodeList], not [div, span]
        var ret = Array.prototype.slice.call(arguments[0]);
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
    isOOMLClass: function(klass) {
        var classProto = klass.prototype;
        while (classProto && classProto != OOML.Element.prototype) {
            classProto = Object.getPrototypeOf(classProto);
        }

        return classProto == OOML.Element.prototype;
    },
    getOOMLClass: function(className, localClasses, imports) {
        if (localClasses[className]) {
            return localClasses[className];
        }

        var ret = imports;
        className.split('.').every(function(part) {
            ret = ret[part];
            return !!ret;
        });

        if (!Utils.isOOMLClass(ret)) {
            throw new TypeError('The class ' + className + ' does not exist');
        }

        return ret;
    },
    isPrimitiveValue: function(val) {
        return val instanceof Date || val === null || Array.isArray(val) || ['number', 'boolean', 'string'].indexOf(typeof val) > -1
    },
    isObjectLiteral: function(obj) {
        return !!obj && (obj.constructor == Object || (obj.__proto__ === undefined && obj instanceof Object));
    },
    createCleanObject: function() {
        return Object.create(null);
    },
    constructElement: function(elemConstructor, obj) {
        if (obj instanceof elemConstructor) {
            return obj;
        } else if (elemConstructor == OOML.Element || elemConstructor == HTMLElement) {
            throw new SyntaxError('Unable to construct new instance; the type is an abstract class');
        } else if (!Utils.isObjectLiteral(obj)) {
            throw new TypeError('Unable to construct new instance; the provided object is not of the correct type');
        }

        return new elemConstructor(obj);
    },
    splitStringByParamholders: function(str) {
        var strParts = [],
            paramMap = Utils.createCleanObject();

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

        var clonedElem;

        if (rootElem instanceof Element) {

            clonedElem = document.createElement(rootElem.nodeName);

            if (rootElem[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]) {
                clonedElem[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS] = rootElem[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]; // Don't clone; keep reference to original function
            }
            if (rootElem[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]) {
                clonedElem[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS] = rootElem[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]; // Don't clone; keep reference to original function
            }

            for (var i = 0; i < rootElem.attributes.length; i++) {
                var rootAttr = rootElem.attributes[i];
                var clonedAttr = document.createAttribute(rootAttr.name);
                clonedAttr.nodeValue = rootAttr.nodeValue;

                if (rootAttr[OOML_NODE_PROPNAME_TEXTFORMAT]) {
                    clonedAttr[OOML_NODE_PROPNAME_TEXTFORMAT] = rootAttr[OOML_NODE_PROPNAME_TEXTFORMAT].slice();
                }
                if (rootAttr[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
                    clonedAttr[OOML_NODE_PROPNAME_FORMATPARAMMAP] = rootAttr[OOML_NODE_PROPNAME_FORMATPARAMMAP]; // Probably don't need to clone as it will never be mutilated
                }

                clonedElem.setAttributeNode(clonedAttr);
            }

            for (var i = 0; i < rootElem.childNodes.length; i++) {
                clonedElem.appendChild( cloneElemForInstantiation(rootElem.childNodes[i]) );
            }

        } else if (rootElem instanceof Text) {

            clonedElem = document.createTextNode(rootElem.nodeValue);
            if (rootElem[OOML_NODE_PROPNAME_TEXTFORMAT]) {
                clonedElem[OOML_NODE_PROPNAME_TEXTFORMAT] = rootElem[OOML_NODE_PROPNAME_TEXTFORMAT].slice();
            }
            if (rootElem[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
                clonedElem[OOML_NODE_PROPNAME_FORMATPARAMMAP] = rootElem[OOML_NODE_PROPNAME_FORMATPARAMMAP]; // Probably don't need to clone as it will never be mutilated
            }

        } else if (rootElem instanceof Comment) {

            if (rootElem[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG]) {
                clonedElem[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG] = rootElem[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG]; // Probably don't need to clone as it will never be mutilated
            }

        }

        return clonedElem;
    },
};
