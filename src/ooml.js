(function(undefined) {
    "use strict";

    <ZC-IMPORT[utils]>

    var OOMLCompatSymbolExists = !!window.Symbol;
    var OOMLCompatSetExists = !!window.Set;
    var OOMLCompatTemplateExists = !!window.HTMLTemplateElement;
    var OOMLCompatDatasetExists = !!document.createElement('div').dataset;

    if (!OOMLCompatSetExists) {
        <ZC-IMPORT[NodeSet]>
        <ZC-IMPORT[StringSet]>
    } else {
        var NodeSet = Set;
        var StringSet = Set;
    }

    var OOMLNodesWithUnwrittenChanges = new NodeSet(),
        OOMLWriteChangesSetTimeout,
        OOMLWriteChanges = function() {

            if (!OOMLNodesWithUnwrittenChanges.size) {
                return;
            }

            if (OOMLWriteChangesSetTimeout) {
                clearTimeout(OOMLWriteChangesSetTimeout);
            }

            OOMLWriteChangesSetTimeout = setTimeout(() => {
                OOMLNodesWithUnwrittenChanges.forEach(node => {
                    node.value = node[OOML_ATTRNODE_PROPNAME_TEXTFORMAT].join('');
                });

                OOMLNodesWithUnwrittenChanges.clear();
            }, 50);

        };

    // NOTE: Property in this case refers to JavaScript object properties, so neither OOML methods nor properties may use these
    var OOMLReservedPropertyNames = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'toObject', 'toJSON', 'assign', 'on', 'attributes'];
    // NOTE: Obviously list not complete, but hopefully the rest should be obvious...
    var OOMLReservedFnArgNames = ['self', 'parent', 'arguments', 'super', 'this', 'class'];

    var OOMLPrimitiveTypes = ['Date', 'null', 'Array', 'number', 'boolean', 'string'];
    var OOMLPropertyNumberTypes = ['natural', 'integer', 'float', 'number'];
    var OOMLPropertyTypes = Utils.concat(['Date', 'null', 'Array', 'boolean', 'string'], OOMLPropertyNumberTypes);
    var OOMLFnArgTypes = Utils.concat(OOMLPropertyTypes, ['object', 'function', 'array', 'OOML.Array', 'OOML.Element']);

    var OOML_ARRAY_PROPNAME_INTERNALARRAY = '__oomlInternalArray',
        OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR = '__oomlElementConstructor',
        OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM = '__oomlAnchorDOMElem',

        OOML_ATTRNODE_PROPNAME_TEXTFORMAT = '__oomlFormatStr',
        OOML_ATTRNODE_PROPNAME_FORMATPARAMMAP = '__oomlParamMap',

        OOML_ELEMENTNODE_PROPNAME_GENERICEVENTHANDLERS = '__oomlGenericEventHandlers',
        OOML_ELEMENTNODE_PROPNAME_CHILDEVENTHANDLERS = '__oomlChildEventHandlers',
        OOML_ELEMENTNODE_PROPNAME_CHILDEVENTHANDLERS_BINDED = '__oomlChildEventHandlersBinded',

        OOML_COMMENTNODE_PROPNAME_BINDEDPROPERTY = '__oomlIsElemPropertyPlaceholder',

        OOML_TEXTNODE_PROPNAME_BINDEDPROPERTY = '__oomlBindedProperty',

        OOML_DOM_PROPNAME_ISNAMESPACE = '__oomlIsNamespace',

        OOML_INSTANCE_PROPNAME_DOMELEM = '__oomlDomElem',
        OOML_INSTANCE_PROPNAME_ATTACH = '__oomlAttach',
        OOML_INSTANCE_PROPNAME_DETACH = '__oomlDetach',

        OOML_CLASS_PROPNAME_PROPNAMES = '__oomlProperties',
        OOML_CLASS_PROPNAME_PREDEFINEDATTRS = '__oomlPredefinedAttributes',
        OOML_CLASS_PROPNAME_PREDEFINEDPROPS = '__oomlPredefinedProperties',
        OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR = '__oomlPredefinedConstructor';

    var OOML = {};

    var OOMLGlobalImports = Utils.createCleanObject();
    OOML.import = function() {
        if (arguments.length == 2) {
            var importName = arguments[0];
            var importClass = arguments[1];
            if (typeof importName != 'string') {
                throw new SyntaxError('Invalid import name');
            }
            if (!Utils.isOOMLClass(importClass)) {
                throw new SyntaxError('Invalid import class');
            }
            if (OOMLGlobalImports[importName]) {
                throw new SyntaxError(`The class "${ importName }" has already been imported`);
            }
            OOMLGlobalImports[importName] = importClass;
        } else {
            for (var i = 0; i < arguments.length; i++) {
                var argobj = arguments[i];
                if (!Utils.isObjectLiteral(argobj)) {
                    throw new SyntaxError('Invalid import definition');
                }
                Object.keys(argobj).forEach(function(importName) {
                    var importClass = argobj[importName];
                    OOML.import(importName, importClass);
                });
            }
        }
    };

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
