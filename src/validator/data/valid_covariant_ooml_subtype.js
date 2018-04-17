// Assumes $base is in $__primitive_types_ooml
let valid_covariant_ooml_subtype = (base, covariant) => {
  // StringSet won't return true if $covariant is not a string
  if (!__primitive_types_ooml_s.has(covariant)) {
    return false;
  }

  if (!__primitive_number_types_ooml_s.has(base)) {
    return base == covariant;
  }

  return __primitive_number_types_ooml_s.has(covariant) &&
         __primitive_number_types_ooml.indexOf(base) >= __primitive_number_types_ooml.indexOf(covariant);
};
