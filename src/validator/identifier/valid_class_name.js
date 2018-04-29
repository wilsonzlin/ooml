let valid_class_name = name => {
  return u_typeof(name, TYPEOF_STRING) &&
         /^[a-zA-Z][a-zA-Z0-9]*$/.test(name) &&
         !__reserved_prop_method_names_s.has(name) &&
         !__reserved_class_names_s.has(name) &&
         !__primitive_types_s.has(name);
};
