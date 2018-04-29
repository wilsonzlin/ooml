let resolve_prop_type_bc_class_reference = (ref, from_module, from_namespace, from_class) => {
  if (ref == "any") {
    return __compiled_dummy_ooml_Instance;
  }

  return resolve_bc_class_reference(ref, from_module, from_namespace, from_class);
};
