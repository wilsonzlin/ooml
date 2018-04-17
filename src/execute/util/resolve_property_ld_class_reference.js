let resolve_property_ld_class_reference = (ref, from_module, from_namespace, from_class) => {
  if (ref == "this") {
    return from_class;
  }
  if (ref == "any") {
    return ooml.Instance;
  }
  return resolve_parent_ld_class_reference(ref, from_module, from_namespace);
};
