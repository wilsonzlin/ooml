let TYPEOF_FUNCTION = 'function';
let TYPEOF_OBJECT = 'object';
let TYPEOF_STRING = 'string';
let TYPEOF_BOOLEAN = 'boolean';
let TYPEOF_NUMBER = 'number';

<ZC-IMPORT[utils]>

let BINDING_STATE_INIT = 1;
let BINDING_STATE_EXISTS = 2;
let BINDING_STATE_MISSING = 3;

let OOMLCompatSymbolExists = !!window.Symbol;
let OOMLCompatSetExists = !!window.Set;
let OOMLCompatTemplateExists = !!window.HTMLTemplateElement;
let OOMLCompatDatasetExists = !!document.createElement('div').dataset;


let NodeSet;
let StringSet;
if (!OOMLCompatSetExists) {
    <ZC-IMPORT[NodeSet]>
    <ZC-IMPORT[StringSet]>
} else {
    NodeSet = Set;
    StringSet = Set;
}

let OOMLNodesWithUnwrittenChanges = new NodeSet(),
    OOMLWriteChangesSetTimeout,
    OOMLWriteChanges = function() {

        if (!OOMLNodesWithUnwrittenChanges.size) {
            return;
        }

        clearTimeout(OOMLWriteChangesSetTimeout);

        OOMLWriteChangesSetTimeout = setTimeout(() => {
            OOMLNodesWithUnwrittenChanges.forEach(attr => {
                attr.ownerElement.setAttribute(attr.name, attr.valueFormat.join(''));
            });

            OOMLNodesWithUnwrittenChanges.clear();
        }, 50);

    };

// NOTE: Property in this case refers to JavaScript object properties, so neither OOML methods nor properties may use these
let OOMLReservedPropertyNames = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'toObject', 'toJSON', 'assign', 'on', 'detach', 'attributes'];
// NOTE: Obviously list not complete, but hopefully the rest should be obvious...
let OOMLReservedFnArgNames = ['self', 'parent', 'arguments', 'super', 'this', 'class'];

let OOMLPrimitiveTypes = ['null', 'number', 'boolean', 'string'];
let OOMLPropertyNumberTypes = ['natural', 'integer', 'float', 'number'];
let OOMLPropertyTypes = Utils.concat(OOMLPrimitiveTypes, OOMLPropertyNumberTypes).slice(0, -1); // Remove duplicate entry "number"
let OOMLFnArgTypes = Utils.concat(OOMLPropertyTypes, ['Object', 'Array', 'function']);

let OOML_ARRAY_PROPNAME_INTERNALARRAY = '__oomlInternalArray';
let OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR = '__oomlElementConstructor';
let OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM = '__oomlAnchorDOMElem';
let OOML_ARRAY_PROPNAME_MUTATIONEVENTLISTENERS = '__oomlMutationEventListeners';

let OOML_HIVE_PROPNAME_INTERNALHIVE = '__oomlHiveInternalHive';
let OOML_HIVE_PROPNAME_KEYPATH_PREFIX = '__oomlHiveKeypath';
let OOML_HIVE_PROPNAME_BINDINGS = '__oomlHiveBindings';
let OOML_HIVE_PROPNAME_BINDINGS_BY_KEYPATH = '__oomlHiveBindingsByKeypath';

let OOML_DOM_PROPNAME_ISNAMESPACE = '__oomlIsNamespace';
let OOML_DOM_PROPNAME_ISCUSTOMHTML = '__oomlIsCustomHtml';

let OOML_INSTANCE_PROPNAME_DOMELEM = '__oomlDomElem';
let OOML_INSTANCE_PROPNAME_ATTACH = '__oomlAttach';
let OOML_INSTANCE_PROPNAME_DETACH = '__oomlDetach';
let OOML_INSTANCE_PROPNAME_DISPATCH = '__oomlDispatch';
let OOML_INSTANCE_PROPNAME_BINDING_ON_STATE_CHANGE = '__oomlBindingOnStateChange';

let OOML_CLASS_PROPNAME_PROPNAMES = '__oomlProperties';
let OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES = '__oomlSuppressedProperties';
let OOML_CLASS_PROPNAME_PREDEFINEDATTRS = '__oomlPredefinedAttributes';
let OOML_CLASS_PROPNAME_PREDEFINEDPROPS = '__oomlPredefinedProperties';
let OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR = '__oomlPredefinedConstructor';
let OOML_CLASS_PROPNAME_EXTENSIONPOINT = '__oomlExtensionPoint';
let OOML_CLASS_PROPNAME_ROOTELEMTAGNAME = '__oomlRootElemTagName';

let OOML = {};

let OOMLGlobalImports = Utils.createCleanObject();
OOML.import = function() {
    if (arguments.length == 2) {
        let importName = arguments[0];
        let importClass = arguments[1];
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
        for (let i = 0; i < arguments.length; i++) {
            let argobj = arguments[i];
            if (!Utils.isObjectLiteral(argobj)) {
                throw new TypeError(`Invalid import definition`);
            }
            Object.keys(argobj).forEach(importName => {
                let importClass = argobj[importName];
                OOML.import(importName, importClass);
            });
        }
    }
};

<ZC-IMPORT[hive]>
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
