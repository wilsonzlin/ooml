((Object, TypeError, SyntaxError, ReferenceError, RangeError, Error, undefined) => {
  "use strict";

  // Load util/* before const/*, as some const/* depend on util/*
  __zc_import("./util/u_assign.js");
  __zc_import("./util/u_deep_clone.js");
  __zc_import("./util/u_define_property.js");
  __zc_import("./util/u_define_data_property.js");
  __zc_import("./util/u_enumerate.js");
  __zc_import("./util/u_eval_js.js");
  __zc_import("./util/u_has_own_property.js");
  __zc_import("./util/u_is_a_type.js");
  __zc_import("./util/u_is_type.js");
  __zc_import("./util/u_iterate.js");
  __zc_import("./util/u_keys.js");
  __zc_import("./util/u_map.js");
  __zc_import("./util/u_new_clean_object.js");
  __zc_import("./util/u_typeof.js");

  __zc_import("./const/BC_CLASS.js");
  __zc_import("./const/BC_CLASSFIELD.js");
  __zc_import("./const/BC_CLASSMETHOD.js");
  __zc_import("./const/BC_CLASSPROP.js");
  __zc_import("./const/BC_CLASSVIEW.js");
  __zc_import("./const/BC_CLASSVIEW_ATTR.js");
  __zc_import("./const/BC_CLASSVIEW_NODE.js");
  __zc_import("./const/BC_INSTANTIATION.js");
  __zc_import("./const/BC_MOD.js");
  __zc_import("./const/BC_NS.js");
  __zc_import("./const/IP_BUILDER.js");
  __zc_import("./const/IP_OOML_ARRAY_OWN.js");
  __zc_import("./const/IP_OOML_ARRAY_PROTO.js");
  __zc_import("./const/IP_OOML_CLASS_OWN.js");
  __zc_import("./const/IP_OOML_EMUL_ATTR.js");
  __zc_import("./const/IP_OOML_EVENTSOURCE_OWN.js");
  __zc_import("./const/IP_OOML_EVENTSOURCE_PROTO.js");
  __zc_import("./const/IP_OOML_INST_OWN.js");
  __zc_import("./const/IP_OOML_INST_PROTO.js");
  __zc_import("./const/IP_OOML_PROPERTIES_STATE.js");
  __zc_import("./const/IP_OOML_RUNTIME_DOM_UPDATE.js");
  __zc_import("./const/IP_NODESET.js");
  __zc_import("./const/IP_NODESET_ELEMENT.js");
  __zc_import("./const/IP_STRINGSET.js");
  __zc_import("./const/TYPEOF.js");

  __zc_import("./compat/Set.js");
  __zc_import("./compat/HTMLTemplateElement.js");
  __zc_import("./compat/Symbol.js");

  __zc_import("./polyfill/StringSet.js");

  __zc_import("./type/primitive_types_js.js");
  __zc_import("./type/primitive_number_types_ooml.js");
  __zc_import("./type/primitive_types_ooml.js");

  __zc_import("./rule/reserved_prop_method_names_s.js");
  __zc_import("./rule/reserved_field_names_s.js");
  __zc_import("./rule/reserved_class_names_s.js");
  __zc_import("./rule/restricted_view_tags_s.js");

  __zc_import("./validator/identifier/valid_class_name.js");
  __zc_import("./validator/identifier/valid_namespace_name.js");
  __zc_import("./validator/identifier/valid_property_or_method_name.js");
  __zc_import("./validator/identifier/valid_module_name.js");
  __zc_import("./validator/identifier/valid_dispatch_event_name.js");
  __zc_import("./validator/identifier/valid_group_name.js");
  __zc_import("./validator/identifier/valid_field_name.js");
  __zc_import("./validator/reference/valid_property_or_method_reference.js");
  __zc_import("./validator/reference/valid_class_reference.js");
  __zc_import("./validator/data/valid_covariant_ooml_type.js");
  __zc_import("./validator/data/valid_ooml_type.js");
  __zc_import("./validator/data/valid_covariant_ooml_subtype.js");
  __zc_import("./validator/data/valid_class_of_base.js");
  __zc_import("./validator/data/valid_empty_object.js");
  __zc_import("./validator/data/valid_object_literal.js");
  __zc_import("./validator/data/valid_ooml_class.js");
  __zc_import("./validator/data/valid_array.js");
  __zc_import("./validator/json/valid_json_array.js");
  __zc_import("./validator/json/valid_json_object.js");
  __zc_import("./validator/json/valid_json_value.js");

  __zc_import("./assert/assert_typeof_r.js");
  __zc_import("./assert/assert_set.js");
  __zc_import("./assert/assert_instanceof_r.js");
  __zc_import("./assert/assert_is_type_r.js");
  __zc_import("./assert/assert_valid_r.js");
  __zc_import("./assert/assert_valid_prop_or_method_reference_p_r.js");
  __zc_import("./assert/assert_unique_in_stringset_s_r.js");
  __zc_import("./assert/assert_not_undefined_r.js");
  __zc_import("./assert/assert_undefined_obj_prop.js");

  __zc_import("./parse/DOM/collect_dom_attrs.js");
  __zc_import("./parse/DOM/get_dom_child_elements.js");

  __zc_import("./parse/DOM/parse_dom_module.js");
  __zc_import("./parse/DOM/parse_dom_namespace.js");
  __zc_import("./parse/DOM/parse_dom_class_property.js");
  __zc_import("./parse/DOM/parse_dom_class_method.js");
  __zc_import("./parse/DOM/parse_dom_class_field.js");
  __zc_import("./parse/DOM/parse_dom_class_initialiser.js");
  __zc_import("./parse/DOM/parse_dom_class.js");
  __zc_import("./parse/DOM/parse_dom_instantiation.js");
  __zc_import("./parse/DOM/parse_dom.js");

  __zc_import("./create/create_module.js");
  __zc_import("./create/create_namespace.js");
  __zc_import("./create/create_class.js");
  __zc_import("./create/create_class_property.js");
  __zc_import("./create/create_class_method.js");
  __zc_import("./create/create_class_field.js");
  __zc_import("./create/create_class_view.js");
  __zc_import("./create/create_instantiation.js");

  __zc_import("./build/util/generate_bc_from_builder.js");
  __zc_import("./build/util/stream_substitution_parts.js");

  __zc_import("./build/resolve/find_bc_class_from_ns.js");
  __zc_import("./build/resolve/find_bc_method_from_class.js");
  __zc_import("./build/resolve/find_bc_mod_from_group.js");
  __zc_import("./build/resolve/find_bc_ns_from_mod.js");
  __zc_import("./build/resolve/find_bc_prop_from_class.js");
  __zc_import("./build/resolve/resolve_bc_class_reference.js");
  __zc_import("./build/resolve/resolve_prop_type_bc_class_reference.js");

  __zc_import("./build/ModuleBuilder.js");
  __zc_import("./build/NamespaceBuilder.js");
  __zc_import("./build/ClassBuilder.js");
  __zc_import("./build/ClassFieldBuilder.js");
  __zc_import("./build/ClassMethodBuilder.js");
  __zc_import("./build/ClassPropertyBuilder.js");
  __zc_import("./build/ClassViewBuilder.js");
  __zc_import("./build/InstantiationBuilder.js");

  __zc_import("./runtime/runtime.js");
  __zc_import("./runtime/dom/update_queue.js");

  __zc_import("./execute/util/construct_ooml_instance.js");
  __zc_import("./execute/util/get_default_value_for_type.js");
  __zc_import("./execute/util/resolve_parent_ld_class_reference.js");
  __zc_import("./execute/util/resolve_property_ld_class_reference.js");
  __zc_import("./execute/util/unserialise_init_state_source.js");

  __zc_import("./execute/exec_class.js");
  __zc_import("./execute/exec_module.js");
  __zc_import("./execute/exec_namespace.js");
  __zc_import("./execute/exec_view_node.js");
  __zc_import("./execute/exec_instantiation.js");

  __zc_import("./ooml/__main__.js");

  __zc_import("./ooml/EventSource/__main__.js");
  __zc_import("./ooml/EventSource/_ATTACH.js");
  __zc_import("./ooml/EventSource/_ERASE_ATTACHMENT_CONFIG.js");
  __zc_import("./ooml/EventSource/_FORWARD_CHANGE.js");
  __zc_import("./ooml/EventSource/_FORWARD_DISPATCH.js");
  __zc_import("./ooml/EventSource/addChangeListener.js");
  __zc_import("./ooml/EventSource/addDispatchHandler.js");
  __zc_import("./ooml/EventSource/dispatch.js");

  __zc_import("./ooml/Instance/__main__.js");
  __zc_import("./ooml/Instance/_GET_PROPERTY.js");
  __zc_import("./ooml/Instance/_RECEIVE_CHANGE.js");
  __zc_import("./ooml/Instance/_RECEIVE_DISPATCH.js");
  __zc_import("./ooml/Instance/_SERIALISE.js");
  __zc_import("./ooml/Instance/_SET_ARRAY_PROPERTY.js");
  __zc_import("./ooml/Instance/_SET_INSTANCE_PROPERTY.js");
  __zc_import("./ooml/Instance/_SET_PRIMITIVE_OR_TRANSIENT_PROPERTY.js");
  __zc_import("./ooml/Instance/Symbol.iterator.js");
  __zc_import("./ooml/Instance/toJSON.js");
  __zc_import("./ooml/Instance/toObject.js");

  __zc_import("./ooml/Array/__main__.js");
  __zc_import("./ooml/Array/_NORMALISE_INDEX.js");
  __zc_import("./ooml/Array/_RECEIVE_CHANGE.js");
  __zc_import("./ooml/Array/_RECEIVE_DISPATCH.js");
  __zc_import("./ooml/Array/get.js");
  __zc_import("./ooml/Array/includes, indexOf, lastIndexOf.js");
  __zc_import("./ooml/Array/iteration.js");
  __zc_import("./ooml/Array/length, first, and last.js");
  __zc_import("./ooml/Array/pop and shift.js");
  __zc_import("./ooml/Array/push and unshift.js");
  __zc_import("./ooml/Array/reverse.js");
  __zc_import("./ooml/Array/slice.js");
  __zc_import("./ooml/Array/sort and sortBy.js");
  __zc_import("./ooml/Array/splice.js");
  __zc_import("./ooml/Array/toArray.js");
  __zc_import("./ooml/Array/toJSON.js");
  __zc_import("./ooml/Array/toString and toLocaleString.js");
  __zc_import("./ooml/Array/__after__.js");

  __zc_import("./ooml/Builder/__main__.js");

  __zc_import("./ooml/create/__main__.js");

  __zc_import("./ooml/execute/__main__.js");
  __zc_import("./ooml/execute/module.js");
  __zc_import("./ooml/execute/anonymousNamespace.js");
  __zc_import("./ooml/execute/anonymousClass.js");
  __zc_import("./ooml/execute/topLevelInstantiation.js");

  __zc_import("./boot/main.js");

  if (typeof exports == TYPEOF_OBJECT) {
    module.exports = ooml;
  } else {
    window.ooml = ooml;
  }
})(Object, TypeError, SyntaxError, ReferenceError, RangeError, Error);
