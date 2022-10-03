let valid_field_name = name => {
  return valid_property_or_method_name(name) &&
         !__reserved_field_names_s.has(name);
};
