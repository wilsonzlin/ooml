// Assumes $base is a valid string in $__primitive_types_js
// or is a ooml class
// or is undefined (default type or no type if transient)
let valid_covariant_ooml_type = (base, covariant) => {
  if (!base) {
    return covariant === undefined ||
           __primitive_types_s.has(covariant);
  }

  if (__primitive_types_s.has(base)) {
    return false;
  }

  return valid_class_of_base(base, covariant);
};
