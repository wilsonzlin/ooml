(function(Object, TypeError, SyntaxError, ReferenceError, RangeError, Error, undefined) {
  "use strict";
  // Alias typeof values to prevent typos and minify better
  let TYPEOF_FUNCTION = "function";
  let TYPEOF_OBJECT = "object";
  let TYPEOF_STRING = "string";
  let TYPEOF_BOOLEAN = "boolean";
  let TYPEOF_NUMBER = "number";

  __zc_import("Utils/concat.js");
  __zc_import("Utils/constructOOMLInstance.js");
  __zc_import("Utils/constructInstanceDomFromShape.js");
  __zc_import("Utils/createCleanObject.js");
  __zc_import("Utils/createOOMLClass.js");
  __zc_import("Utils/deepClone.js");
  __zc_import("Utils/deepFreeze.js");
  __zc_import("Utils/DOM.find.js");
  __zc_import("Utils/DOM.hasAncestorOrDescendantNamespace.js");
  __zc_import("Utils/DOM.setData.js");
  __zc_import("Utils/DOM.writeValue.js");
  __zc_import("Utils/getClassFromString.js");
  __zc_import("Utils/getEvalValue.js");
  __zc_import("Utils/hasOwnProperty.js");
  __zc_import("Utils/isNotOrBlankString.js");
  __zc_import("Utils/isObjectLiteral.js");
  __zc_import("Utils/isOOMLClass.js");
  __zc_import("Utils/isPrimitiveValue.js");
  __zc_import("Utils/isType.js");
  __zc_import("Utils/isValidPropertyName.js");
  __zc_import("Utils/iterate.js");
  __zc_import("Utils/parseBindingDeclaration.js");
  __zc_import("Utils/parseMethodLinkingDeclaration.js");
  __zc_import("Utils/parsePropertySubstitution.js");
  __zc_import("Utils/parseTypeDeclaration.js");
  __zc_import("Utils/processBracesSyntaxToPartsAndMap.js");
  __zc_import("Utils/processClassDeclaration.js");
  __zc_import("Utils/toDashCase.js");
  __zc_import("Utils/transformClassRawDomToShape.js");
  __zc_import("Utils/typeOf.js");
  __zc_import("Utils/unserialiseInitState.js");

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

  __zc_import("Set/NodeSet.js");
  __zc_import("Set/StringSet.js");

  let OOMLNodesWithUnwrittenChanges = new NodeSet();
  let OOMLWriteChangesSetTimeout;
  let OOMLWriteChanges = () => {

    if (!OOMLNodesWithUnwrittenChanges.size) {
      return;
    }

    clearTimeout(OOMLWriteChangesSetTimeout);

    OOMLWriteChangesSetTimeout = setTimeout(() => {
      OOMLNodesWithUnwrittenChanges.forEach(attr => {
        attr.ownerElement.setAttribute(attr.name, attr.valueFormat.join(""));
      });

      OOMLNodesWithUnwrittenChanges.clear();
    }, 50);

  };

  let dashCaseCache = Utils_createCleanObject();

  // NOTE: "Property" in this case refers to JavaScript object properties, so neither OOML methods nor properties may use these
  let OOMLReservedPropertyNames = new StringSet(["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf", "toObject", "toJSON", "assign", "on", "detach", "attributes", "namespace", "handle", "keys"]);

  let JavaScriptNativePrimitiveTypes = ["null", "number", "boolean", "string"];
  let OOMLPrimitiveNumberTypes = new StringSet(["natural", "integer", "float", "number"]);
  // Duplicate entry "number" will be removed automatically
  let OOMLPrimitiveTypes = new StringSet(Utils_concat(JavaScriptNativePrimitiveTypes, OOMLPrimitiveNumberTypes.values()));

  let OOML_ARRAY_PROPNAME_INTERNAL_ARRAY = "__oomlInternalArray";
  let OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR = "__oomlElementConstructor";
  let OOML_ARRAY_PROPNAME_DOM_ANCHOR = "__oomlAnchorDOMElem";
  let OOML_ARRAY_PROPNAME_INTERNAL_DOM_PARENT = "__oomlArrayAnchorPlaceholderParent";

  let OOML_ARRAY_PROPNAME_MUTATION_OBSERVERS = "__oomlMutationEventListeners";
  let OOML_ARRAY_PROPNAME_DISPATCH_HANDLERS = "__oomlDispatchEventListeners";

  let OOML_ARRAY_PROPNAME_ATTACH = "__oomlArrayAttach";
  let OOML_ARRAY_PROPNAME_DETACH = "__oomlArrayDetach";
  let OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE = "__oomlAttachmentParentInstance";
  let OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_PROPERTY = "__oomlAttachmentParentProperty";

  let OOML_HIVE_PROPNAME_INTERNALHIVE = "__oomlHiveInternalHive";
  let OOML_HIVE_PROPNAME_SUBSCRIPTIONS = "__oomlHiveSubscriptions";
  let OOML_HIVE_PROPNAME_SUBSCRIBE = "__oomlHiveSubscribe";
  let OOML_HIVE_PROPNAME_KEYPATH_PREFIX = "__oomlHiveKeypath";
  let OOML_HIVE_PROPNAME_BINDINGS = "__oomlHiveBindings";
  let OOML_HIVE_PROPNAME_BINDINGS_BY_KEYPATH = "__oomlHiveBindingsByKeypath";

  let OOML_HIVESUBSCRIBER_PROPNAME_RECEIVE = "__oomlHiveSubscriberReceive";
  let OOML_HIVESUBSCRIBER_PROPNAME_HANDLERS = "__oomlHiveSubscriberHandlers";

  let OOML_DOM_PROPNAME_ISNAMESPACE = "__oomlIsNamespace";
  let OOML_DOM_PROPNAME_ISCUSTOMHTML = "__oomlIsCustomHtml";

  let OOML_INSTANCE_PROPNAME_DOMELEM = "__oomlDomElem";
  let OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT = "__oomlCurrentAttachment";
  let OOML_INSTANCE_PROPNAME_ATTACH = "__oomlAttach";
  let OOML_INSTANCE_PROPNAME_DETACH = "__oomlDetach";
  let OOML_INSTANCE_PROPNAME_HANDLE_DISPATCH = "__oomlDispatch";
  let OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH = "__oomlEventHandlersDispatch";
  let OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION = "__oomlEventHandlersMutation";
  let OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT = "__oomlPropertiesInternalObject";
  let OOML_INSTANCE_PROPNAME_GET_EXPOSED_DOM_ELEM = "__oomlGetExposedDomElem";
  let OOML_INSTANCE_PROPNAME_EXPOSED_DOM_ELEMS = "__oomlExposedDomElems";
  let OOML_INSTANCE_PROPNAME_GET_PROPERTY = "__oomlGetProperty";
  let OOML_INSTANCE_PROPNAME_SET_PRIMITIVE_OR_TRANSIENT_PROPERTY = "__oomlSetPrimitiveProperty";
  let OOML_INSTANCE_PROPNAME_SET_ARRAY_PROPERTY = "__oomlSetArrayProperty";
  let OOML_INSTANCE_PROPNAME_SET_OBJECT_PROPERTY = "__oomlSetObjectProperty";
  let OOML_INSTANCE_PROPNAME_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE = "__oomlHandleBindingChangeEventFromStore";
  let OOML_INSTANCE_PROPNAME_REBIND_BINDING = "__oomlRebindDynamicBinding";
  let OOML_INSTANCE_PROPNAME_PROPERTY_REBIND_SET_TIMEOUTS = "__oomlPropertyRebindSetTimeouts";

  let OOML_CLASS_PROPNAME_PROPNAMES = "__oomlProperties";
  let OOML_CLASS_PROPNAME_PROPERTIES = "__oomlPredefinedProperties";
  let OOML_CLASS_PROPNAME_PROPERTIES_TO_DEPENDENT_BINDINGS = "__oomlPropertiesToDependentBindings";
  let OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR = "__oomlPredefinedConstructor";
  let OOML_CLASS_PROPNAME_VIEW_SHAPE = "__oomlExtensionPoint";
  let OOML_CLASS_PROPNAME_EXTENSIONPOINT_PATH = "__oomlExtensionPointPath";
  let OOML_CLASS_PROPNAME_ROOTELEMTAGNAME = "__oomlRootElemTagName";
  let OOML_CLASS_PROPNAME_SELF_AND_ANCESTOR_CONSTRUCTORS = "__oomlAncestorClasses";

  let OOML = {};

  let OOMLGlobalImports = Utils_createCleanObject();
  OOML.import = () => {
    if (arguments.length == 2) {
      let importName = arguments[0];
      let importClass = arguments[1];
      if (!Utils_typeOf(importName, TYPEOF_STRING)) {
        throw TypeError(`Invalid import name`);
      }
      if (!Utils_isOOMLClass(importClass)) {
        throw TypeError(`Invalid import class`);
      }
      if (OOMLGlobalImports[importName]) {
        throw ReferenceError(`The class "${ importName }" has already been imported`);
      }
      OOMLGlobalImports[importName] = importClass;
    } else {
      for (let i = 0; i < arguments.length; i++) {
        let argobj = arguments[i];
        if (!Utils_isObjectLiteral(argobj)) {
          throw TypeError(`Invalid import definition`);
        }
        Object.keys(argobj)
          .forEach(importName => {
            let importClass = argobj[importName];
            OOML.import(importName, importClass);
          });
      }
    }
  };

  __zc_import("OOML.Hive/__main__.js");

  __zc_import("OOML.Array/__main__.js");
  __zc_import("OOML.Array/addDispatchHandler.js");
  __zc_import("OOML.Array/addMutationObserver.js");
  __zc_import("OOML.Array/detach.js");
  __zc_import("OOML.Array/get.js");
  __zc_import("OOML.Array/includes.js");
  __zc_import("OOML.Array/indexOf and lastIndexOf.js");
  __zc_import("OOML.Array/iteration.js");
  __zc_import("OOML.Array/length.js");
  __zc_import("OOML.Array/pop.js");
  __zc_import("OOML.Array/push.js");
  __zc_import("OOML.Array/reverse.js");
  __zc_import("OOML.Array/shift.js");
  __zc_import("OOML.Array/slice.js");
  __zc_import("OOML.Array/sort.js");
  __zc_import("OOML.Array/splice.js");
  __zc_import("OOML.Array/toArray.js");
  __zc_import("OOML.Array/toJSON.js");
  __zc_import("OOML.Array/toString.js");
  __zc_import("OOML.Array/unshift.js");
  __zc_import("OOML.Array/_ATTACH.js");
  __zc_import("OOML.Array/_HANDLE_DISPATCH.js");
  __zc_import("OOML.Array/_REMOVE_ATTACHMENT_CONFIG.js");
  __zc_import("OOML.Array/__after__.js");

  __zc_import("OOML.Instance/__main__.js");
  __zc_import("OOML.Instance/addDispatchHandler.js");
  __zc_import("OOML.Instance/addMutationObserver.js");
  __zc_import("OOML.Instance/assign.js");
  __zc_import("OOML.Instance/detach.js");
  __zc_import("OOML.Instance/dispatch.js");
  __zc_import("OOML.Instance/keys.js");
  __zc_import("OOML.Instance/Symbol.iterator.js");
  __zc_import("OOML.Instance/toJSON.js");
  __zc_import("OOML.Instance/toObject.js");
  __zc_import("OOML.Instance/_ATTACH.js");
  __zc_import("OOML.Instance/_GET_EXPOSED_DOM_ELEM.js");
  __zc_import("OOML.Instance/_GET_PROPERTY.js");
  __zc_import("OOML.Instance/_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE.js");
  __zc_import("OOML.Instance/_HANDLE_DISPATCH.js");
  __zc_import("OOML.Instance/_REBIND_BINDING.js");
  __zc_import("OOML.Instance/_REMOVE_ATTACHMENT_CONFIG.js");
  __zc_import("OOML.Instance/_SET_ARRAY_PROPERTY.js");
  __zc_import("OOML.Instance/_SET_ELEMENT_PROPERTY.js");
  __zc_import("OOML.Instance/_SET_PRIMITIVE_OR_TRANSIENT_PROPERTY.js");

  __zc_import("OOML.Namespace/__main__.js");

  // Should be fine to use array, as there aren't that many (also order is required)
  // TODO
  let namespaces = [];

  if (typeof exports == TYPEOF_OBJECT) {
    module.exports = OOML;
  } else {
    window.OOML = OOML;
  }
})(Object, TypeError, SyntaxError, ReferenceError, RangeError, Error);
