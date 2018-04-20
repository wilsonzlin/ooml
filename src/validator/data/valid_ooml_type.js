let valid_ooml_type = t => {
  return __primitive_types_s.has(t) ||
         valid_class_reference(t);
};
