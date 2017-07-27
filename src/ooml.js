/*
 * READ THIS BEFORE CONTINUING
 *
 * Before attempting to read or contribute to code that forms ooml.js,
 * keep in mind that the code was written like this in order to
 * ensure that the resulting ooml.js is:
 *
 *  1) Very small/minifiable
 *  2) Very speedy and efficient
 *  3) Very easy to use
 *
 */



// Alias typeof values to prevent typos and minify better
let TYPEOF_FUNCTION = 'function';
let TYPEOF_OBJECT = 'object';
let TYPEOF_STRING = 'string';
let TYPEOF_BOOLEAN = 'boolean';
let TYPEOF_NUMBER = 'number';

// This line will be removed by compiler; Utils.* functions will be flattened to individual functions
let Utils = {};
<ZC-IMPORT[utils.DOM]>

let BINDING_STATE_INIT = 1;
let BINDING_STATE_EXISTS = 2;
let BINDING_STATE_MISSING = 3;

// Feature detection
let OOMLCompatSymbolExists = !!window.Symbol;
let OOMLCompatSetExists = !!window.Set;
let OOMLCompatTemplateExists = !!window.HTMLTemplateElement;
let OOMLCompatDatasetExists = !!HTMLElement.prototype.dataset;


<ZC-IMPORT[NodeSet]>
<ZC-IMPORT[StringSet]>

let OOMLNodesWithUnwrittenChanges = new NodeSet();
let OOMLWriteChangesSetTimeout;
let OOMLWriteChanges = () => {

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

let dashCaseCache = Utils.createCleanObject();

// NOTE: Property in this case refers to JavaScript object properties, so neither OOML methods nor properties may use these
let OOMLReservedPropertyNames = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'toObject', 'toJSON', 'assign', 'on', 'detach', 'attributes', 'namespace', 'handle', 'keys'];

let OOMLPrimitiveTypes = ['null', 'number', 'boolean', 'string'];
let OOMLPropertyNumberTypes = ['natural', 'integer', 'float', 'number'];
let OOMLPropertyTypes = Utils.concat(OOMLPrimitiveTypes, OOMLPropertyNumberTypes).slice(0, -1); // Remove duplicate entry "number"

let OOML_ARRAY_PROPNAME_INTERNALARRAY = '__oomlInternalArray';
let OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR = '__oomlElementConstructor';
let OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM = '__oomlAnchorDOMElem';
let OOML_ARRAY_PROPNAME_MUTATIONEVENTLISTENERS = '__oomlMutationEventListeners';

let OOML_HIVE_PROPNAME_INTERNALHIVE = '__oomlHiveInternalHive';
let OOML_HIVE_PROPNAME_INTERNALARRAY = '__oomlHiveInternalArray';
let OOML_HIVE_PROPNAME_SUBSCRIPTIONS = '__oomlHiveSubscriptions';
let OOML_HIVE_PROPNAME_SUBSCRIBE = '__oomlHiveSubscribe';
let OOML_HIVE_PROPNAME_KEYPATH_PREFIX = '__oomlHiveKeypath';
let OOML_HIVE_PROPNAME_BINDINGS = '__oomlHiveBindings';
let OOML_HIVE_PROPNAME_BINDINGS_BY_KEYPATH = '__oomlHiveBindingsByKeypath';

let OOML_HIVESUBSCRIBER_PROPNAME_RECEIVE = '__oomlHiveSubscriberReceive';
let OOML_HIVESUBSCRIBER_PROPNAME_HANDLERS = '__oomlHiveSubscriberHandlers';

let OOML_DOM_PROPNAME_ISNAMESPACE = '__oomlIsNamespace';
let OOML_DOM_PROPNAME_ISCUSTOMHTML = '__oomlIsCustomHtml';

let OOML_INSTANCE_PROPNAME_DOMELEM = '__oomlDomElem';
let OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT = '__oomlCurrentAttachment';
let OOML_INSTANCE_PROPNAME_ATTACH = '__oomlAttach';
let OOML_INSTANCE_PROPNAME_DETACH = '__oomlDetach';
let OOML_INSTANCE_PROPNAME_DISPATCH = '__oomlDispatch';
let OOML_INSTANCE_PROPNAME_BINDING_ON_STORE_VALUE_CHANGE = '__oomlBindingOnStateChange';
let OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH = '__oomlEventHandlersDispatch';
let OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION = '__oomlEventHandlersMutation';
let OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT = '__oomlPropertiesInternalObject';
let OOML_INSTANCE_PROPNAME_GET_PROPERTY = '__oomlGetProperty';
let OOML_INSTANCE_PROPNAME_SET_PRIMITIVE_PROPERTY = '__oomlSetPrimitiveProperty';
let OOML_INSTANCE_PROPNAME_SET_ARRAY_PROPERTY = '__oomlSetArrayProperty';
let OOML_INSTANCE_PROPNAME_SET_OBJECT_PROPERTY = '__oomlSetObjectProperty';
let OOML_INSTANCE_PROPNAME_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE = '__oomlHandleBindingChangeEventFromStore';
let OOML_INSTANCE_PROPNAME_REBIND_DYNAMIC_BINDING = '__oomlRebindDynamicBinding';
let OOML_INSTANCE_PROPNAME_PROPERTY_REBIND_SET_TIMEOUTS = '__oomlPropertyRebindSetTimeouts';

let OOML_CLASS_PROPNAME_PROPNAMES = '__oomlProperties';
let OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES = '__oomlSuppressedProperties';
let OOML_CLASS_PROPNAME_PREDEFINEDPROPS = '__oomlPredefinedProperties';
let OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR = '__oomlPredefinedConstructor';
let OOML_CLASS_PROPNAME_EXTENSIONPOINT = '__oomlExtensionPoint';
let OOML_CLASS_PROPNAME_ROOTELEMTAGNAME = '__oomlRootElemTagName';

let OOML = {};

let OOMLGlobalImports = Utils.createCleanObject();
OOML.import = () => {
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
