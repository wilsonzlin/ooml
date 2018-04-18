let valid_ooml_type = t => {
  if (valid_array(t)) {
    let has_number_type = false;
    return t.every((st, idx) => {
      if (!__primitive_types_ooml_s.has(st)) {
        return false;
      }

      // Check for duplicates
      if (t.indexOf(st) == idx) {
        return false;
      }

      // There can only be one number type
      if (__primitive_number_types_ooml_s.has(type)) {
        if (has_number_type) {
          return false;
        }
        has_number_type = true;
      }

      return true;
    });
  }

  return valid_class_reference(t);
};
