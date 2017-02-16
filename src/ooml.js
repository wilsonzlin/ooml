var TYPEOF_FUNCTION = 'function';
var TYPEOF_OBJECT = 'object';
var TYPEOF_STRING = 'string';
var TYPEOF_BOOLEAN = 'boolean';
var TYPEOF_NUMBER = 'number';
/* OVERRIDE: UNUSED
var TYPEOF_UNDEFINED = 'undefined';
*/

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
            OOMLNodesWithUnwrittenChanges.forEach(attr => {
                attr.ownerElement.setAttribute(attr.name, attr.valueFormat.join(''));
            });

            OOMLNodesWithUnwrittenChanges.clear();
        }, 50);

    };

// NOTE: Property in this case refers to JavaScript object properties, so neither OOML methods nor properties may use these
var OOMLReservedPropertyNames = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'toObject', 'toJSON', 'assign', 'on', 'attributes'];
// NOTE: Obviously list not complete, but hopefully the rest should be obvious...
var OOMLReservedFnArgNames = ['self', 'parent', 'arguments', 'super', 'this', 'class'];

var OOMLPrimitiveTypes = ['null', 'number', 'boolean', 'string'];
var OOMLPropertyNumberTypes = ['natural', 'integer', 'float', 'number'];
var OOMLPropertyTypes = Utils.concat(OOMLPrimitiveTypes, OOMLPropertyNumberTypes).slice(0, -1); // Remove duplicate entry "number"
var OOMLFnArgTypes = Utils.concat(OOMLPropertyTypes, ['Object', 'Array', 'function']);

var OOML_ARRAY_PROPNAME_INTERNALARRAY = '__oomlInternalArray',
    OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR = '__oomlElementConstructor',
    OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM = '__oomlAnchorDOMElem',
    OOML_ARRAY_PROPNAME_MUTATIONEVENTLISTENERS = '__oomlMutationEventListeners',

    OOML_DOM_PROPNAME_ISNAMESPACE = '__oomlIsNamespace',
    OOML_DOM_PROPNAME_ISCUSTOMHTML = '__oomlIsCustomHtml',

    OOML_INSTANCE_PROPNAME_DOMELEM = '__oomlDomElem',
    OOML_INSTANCE_PROPNAME_ATTACH = '__oomlAttach',
    OOML_INSTANCE_PROPNAME_DETACH = '__oomlDetach',
    OOML_INSTANCE_PROPNAME_DISPATCH = '__oomlDispatch',

    OOML_CLASS_PROPNAME_PROPNAMES = '__oomlProperties',
    OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES = '__oomlSuppressedProperties',
    OOML_CLASS_PROPNAME_PREDEFINEDATTRS = '__oomlPredefinedAttributes',
    OOML_CLASS_PROPNAME_PREDEFINEDPROPS = '__oomlPredefinedProperties',
    OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR = '__oomlPredefinedConstructor',
    OOML_CLASS_PROPNAME_EXTENSIONPOINT = '__oomlExtensionPoint',
    OOML_CLASS_PROPNAME_ROOTELEMTAGNAME = '__oomlRootElemTagName';

var OOML = {};

var OOMLGlobalImports = Utils.createCleanObject();
OOML.import = function() {
    if (arguments.length == 2) {
        var importName = arguments[0];
        var importClass = arguments[1];
        if (!Utils.typeOf(importName, TYPEOF_STRING)) {
            throw new TypeError(`Invalid import name`);
        }
        if (!Utils.isOOMLClass(importClass)) {
            throw new TypeError(`Invalid import class`);
        }
        if (OOMLGlobalImports[importName]) {
            throw new ReferenceError(`The class "${ importName }" has already been imported`);
        }
        OOMLGlobalImports[importName] = importClass;
    } else {
        for (var i = 0; i < arguments.length; i++) {
            var argobj = arguments[i];
            if (!Utils.isObjectLiteral(argobj)) {
                throw new TypeError(`Invalid import definition`);
            }
            Object.keys(argobj).forEach(importName => {
                var importClass = argobj[importName];
                OOML.import(importName, importClass);
            });
        }
    }
};

<ZC-IMPORT[array]>
<ZC-IMPORT[array-methods-core]>
<ZC-IMPORT[array-methods-mutation]>
<ZC-IMPORT[array-methods-access]>
<ZC-IMPORT[array-methods-iteration]>
<ZC-IMPORT[element]>
<ZC-IMPORT[init]>

if (typeof exports == TYPEOF_OBJECT) {
    module.exports = OOML;
} else {
    window.OOML = OOML;
}
