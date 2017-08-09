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

<ZC-IMPORT[Utils/__main__.js]>
<ZC-IMPORT[Utils/concat.js]>
<ZC-IMPORT[Utils/constructOOMLInstance.js]>
<ZC-IMPORT[Utils/constructInstanceDomFromShape.js]>
<ZC-IMPORT[Utils/createCleanObject.js]>
<ZC-IMPORT[Utils/createOOMLClass.js]>
<ZC-IMPORT[Utils/deepClone.js]>
<ZC-IMPORT[Utils/deepFreeze.js]>
<ZC-IMPORT[Utils/DOM.find.js]>
<ZC-IMPORT[Utils/DOM.hasAncestorOrDescendantNamespace.js]>
<ZC-IMPORT[Utils/DOM.setData.js]>
<ZC-IMPORT[Utils/DOM.writeValue.js]>
<ZC-IMPORT[Utils/getClassFromString.js]>
<ZC-IMPORT[Utils/getEvalValue.js]>
<ZC-IMPORT[Utils/hasOwnProperty.js]>
<ZC-IMPORT[Utils/isNotOrBlankString.js]>
<ZC-IMPORT[Utils/isObjectLiteral.js]>
<ZC-IMPORT[Utils/isOOMLClass.js]>
<ZC-IMPORT[Utils/isPrimitiveValue.js]>
<ZC-IMPORT[Utils/isType.js]>
<ZC-IMPORT[Utils/isValidPropertyName.js]>
<ZC-IMPORT[Utils/iterate.js]>
<ZC-IMPORT[Utils/parseBindingDeclaration.js]>
<ZC-IMPORT[Utils/parseMethodLinkingDeclaration.js]>
<ZC-IMPORT[Utils/parsePropertySubstitution.js]>
<ZC-IMPORT[Utils/parseTypeDeclaration.js]>
<ZC-IMPORT[Utils/processBracesSyntaxToPartsAndMap.js]>
<ZC-IMPORT[Utils/processClassDeclaration.js]>
<ZC-IMPORT[Utils/toDashCase.js]>
<ZC-IMPORT[Utils/transformClassRawDomToShape.js]>
<ZC-IMPORT[Utils/typeOf.js]>
<ZC-IMPORT[Utils/unserialiseInitState.js]>

let BINDING_STATE_INIT = 1;
let BINDING_STATE_EXISTS = 2;
let BINDING_STATE_MISSING = 3;

// Feature detection
let OOMLCompatSymbolExists = !!window.Symbol;
let OOMLCompatSetExists = !!window.Set;
let OOMLCompatTemplateExists = !!window.HTMLTemplateElement;
// Can't use `!!HTMLElement.prototype.dataset` because "illegal invocation"
// Can't use `!!document.body.dataset` because <body> may have not been loaded yet
let OOMLCompatDatasetExists = !!document.head.dataset;

<ZC-IMPORT[Set/NodeSet.js]>
<ZC-IMPORT[Set/StringSet.js]>

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

// NOTE: "Property" in this case refers to JavaScript object properties, so neither OOML methods nor properties may use these
let OOMLReservedPropertyNames = new StringSet(['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'toObject', 'toJSON', 'assign', 'on', 'detach', 'attributes', 'namespace', 'handle', 'keys']);

let JavaScriptNativePrimitiveTypes = ['null', 'number', 'boolean', 'string'];
let OOMLPrimitiveNumberTypes = new StringSet(['natural', 'integer', 'float', 'number']);
// Duplicate entry "number" will be removed automatically
let OOMLPrimitiveTypes = new StringSet(Utils.concat(JavaScriptNativePrimitiveTypes, OOMLPrimitiveNumberTypes.values()));

let OOML_ARRAY_PROPNAME_INTERNAL_ARRAY = '__oomlInternalArray';
let OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR = '__oomlElementConstructor';
let OOML_ARRAY_PROPNAME_DOM_ANCHOR = '__oomlAnchorDOMElem';
let OOML_ARRAY_PROPNAME_INTERNAL_DOM_PARENT = '__oomlArrayAnchorPlaceholderParent';

let OOML_ARRAY_PROPNAME_MUTATION_OBSERVERS = '__oomlMutationEventListeners';
let OOML_ARRAY_PROPNAME_DISPATCH_HANDLERS = '__oomlDispatchEventListeners';

let OOML_ARRAY_PROPNAME_ATTACH = '__oomlArrayAttach';
let OOML_ARRAY_PROPNAME_DETACH = '__oomlArrayDetach';
let OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE = '__oomlAttachmentParentInstance';
let OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_PROPERTY = '__oomlAttachmentParentProperty';

let OOML_HIVE_PROPNAME_INTERNALHIVE = '__oomlHiveInternalHive';
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
let OOML_INSTANCE_PROPNAME_HANDLE_DISPATCH = '__oomlDispatch';
let OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH = '__oomlEventHandlersDispatch';
let OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION = '__oomlEventHandlersMutation';
let OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT = '__oomlPropertiesInternalObject';
let OOML_INSTANCE_PROPNAME_GET_EXPOSED_DOM_ELEM = '__oomlGetExposedDomElem';
let OOML_INSTANCE_PROPNAME_EXPOSED_DOM_ELEMS = '__oomlExposedDomElems';
let OOML_INSTANCE_PROPNAME_GET_PROPERTY = '__oomlGetProperty';
let OOML_INSTANCE_PROPNAME_SET_PRIMITIVE_OR_TRANSIENT_PROPERTY = '__oomlSetPrimitiveProperty';
let OOML_INSTANCE_PROPNAME_SET_ARRAY_PROPERTY = '__oomlSetArrayProperty';
let OOML_INSTANCE_PROPNAME_SET_OBJECT_PROPERTY = '__oomlSetObjectProperty';
let OOML_INSTANCE_PROPNAME_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE = '__oomlHandleBindingChangeEventFromStore';
let OOML_INSTANCE_PROPNAME_REBIND_BINDING = '__oomlRebindDynamicBinding';
let OOML_INSTANCE_PROPNAME_PROPERTY_REBIND_SET_TIMEOUTS = '__oomlPropertyRebindSetTimeouts';

let OOML_CLASS_PROPNAME_PROPNAMES = '__oomlProperties';
let OOML_CLASS_PROPNAME_PROPERTIES = '__oomlPredefinedProperties';
let OOML_CLASS_PROPNAME_PROPERTIES_TO_DEPENDENT_BINDINGS = '__oomlPropertiesToDependentBindings';
let OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR = '__oomlPredefinedConstructor';
let OOML_CLASS_PROPNAME_VIEW_SHAPE = '__oomlExtensionPoint';
let OOML_CLASS_PROPNAME_EXTENSIONPOINT_PATH = '__oomlExtensionPointPath';
let OOML_CLASS_PROPNAME_ROOTELEMTAGNAME = '__oomlRootElemTagName';
let OOML_CLASS_PROPNAME_SELF_AND_ANCESTOR_CONSTRUCTORS = '__oomlAncestorClasses';

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

<ZC-IMPORT[OOML.Hive/__main__.js]>

<ZC-IMPORT[OOML.Array/__main__.js]>
<ZC-IMPORT[OOML.Array/addDispatchHandler.js]>
<ZC-IMPORT[OOML.Array/addMutationObserver.js]>
<ZC-IMPORT[OOML.Array/detach.js]>
<ZC-IMPORT[OOML.Array/get.js]>
<ZC-IMPORT[OOML.Array/includes.js]>
<ZC-IMPORT[OOML.Array/indexOf and lastIndexOf.js]>
<ZC-IMPORT[OOML.Array/iteration.js]>
<ZC-IMPORT[OOML.Array/length.js]>
<ZC-IMPORT[OOML.Array/pop.js]>
<ZC-IMPORT[OOML.Array/push.js]>
<ZC-IMPORT[OOML.Array/reverse.js]>
<ZC-IMPORT[OOML.Array/shift.js]>
<ZC-IMPORT[OOML.Array/slice.js]>
<ZC-IMPORT[OOML.Array/sort.js]>
<ZC-IMPORT[OOML.Array/splice.js]>
<ZC-IMPORT[OOML.Array/toArray.js]>
<ZC-IMPORT[OOML.Array/toJSON.js]>
<ZC-IMPORT[OOML.Array/toString.js]>
<ZC-IMPORT[OOML.Array/unshift.js]>
<ZC-IMPORT[OOML.Array/_ATTACH.js]>
<ZC-IMPORT[OOML.Array/_HANDLE_DISPATCH.js]>
<ZC-IMPORT[OOML.Array/_REMOVE_ATTACHMENT_CONFIG.js]>
<ZC-IMPORT[OOML.Array/__after__.js]>

<ZC-IMPORT[OOML.Instance/__main__.js]>
<ZC-IMPORT[OOML.Instance/addDispatchHandler.js]>
<ZC-IMPORT[OOML.Instance/addMutationObserver.js]>
<ZC-IMPORT[OOML.Instance/assign.js]>
<ZC-IMPORT[OOML.Instance/detach.js]>
<ZC-IMPORT[OOML.Instance/dispatch.js]>
<ZC-IMPORT[OOML.Instance/keys.js]>
<ZC-IMPORT[OOML.Instance/Symbol.iterator.js]>
<ZC-IMPORT[OOML.Instance/toJSON.js]>
<ZC-IMPORT[OOML.Instance/toObject.js]>
<ZC-IMPORT[OOML.Instance/_ATTACH.js]>
<ZC-IMPORT[OOML.Instance/_GET_EXPOSED_DOM_ELEM.js]>
<ZC-IMPORT[OOML.Instance/_GET_PROPERTY.js]>
<ZC-IMPORT[OOML.Instance/_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE.js]>
<ZC-IMPORT[OOML.Instance/_HANDLE_DISPATCH.js]>
<ZC-IMPORT[OOML.Instance/_REBIND_BINDING.js]>
<ZC-IMPORT[OOML.Instance/_REMOVE_ATTACHMENT_CONFIG.js]>
<ZC-IMPORT[OOML.Instance/_SET_ARRAY_PROPERTY.js]>
<ZC-IMPORT[OOML.Instance/_SET_ELEMENT_PROPERTY.js]>
<ZC-IMPORT[OOML.Instance/_SET_PRIMITIVE_OR_TRANSIENT_PROPERTY.js]>

<ZC-IMPORT[OOML.Namespace/__main__.js]>

if (typeof exports == TYPEOF_OBJECT) {
    module.exports = OOML;
} else {
    window.OOML = OOML;
}
