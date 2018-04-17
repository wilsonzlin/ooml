let get_default_value_for_type = type => {
  if (!type || !valid_array(type) || type[0] == TYPEOF_OOML_NULL) {
    return null;
  }

  if (__primitive_number_types_ooml_s.has(type[0])) {
    return 0;
  }

  if (type == TYPEOF_STRING) {
    return "";
  }

  return false;
};
