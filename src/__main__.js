__zc_import("./__ext/oomlvm/__main__.js");
__zc_import("./__ext/oomlc-core/__main__.js");

// Redirect oomlc-core compiled BC storage to oomlvm bytecode storage
__compiled_bc_anon_classes = __rt_bc_anon_classes;
__compiled_bc_modules = __rt_bc_modules;
__compiled_bc_groups = __rt_bc_groups;

__zc_import("./compat/HTMLTemplateElement.js");

__zc_import("./parse/DOM/util/collect_dom_attrs.js");
__zc_import("./parse/DOM/util/get_dom_child_elements.js");

__zc_import("./parse/DOM/parse_dom_class_field.js");
__zc_import("./parse/DOM/parse_dom_class_method.js");
__zc_import("./parse/DOM/parse_dom_class_initialiser.js");
__zc_import("./parse/DOM/parse_dom_class_property.js");
__zc_import("./parse/DOM/parse_dom_class.js");
__zc_import("./parse/DOM/parse_dom_instantiation.js");
__zc_import("./parse/DOM/parse_dom_namespace.js");
__zc_import("./parse/DOM/parse_dom_module.js");
__zc_import("./parse/DOM/parse_dom.js");

__zc_import("./create/create_class_field.js");
__zc_import("./create/create_class_method.js");
__zc_import("./create/create_class_property.js");
__zc_import("./create/create_class_view.js");
__zc_import("./create/create_class.js");
__zc_import("./create/create_instantiation.js");
__zc_import("./create/create_namespace.js");
__zc_import("./create/create_module.js");

__zc_import("./ooml/create/__main__.js");

__zc_import("./boot/main.js");
