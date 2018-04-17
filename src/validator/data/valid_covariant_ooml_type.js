// Assumes $base is a valid array of $__primitive_types_ooml
// or is a ooml class
// or is undefined (default type or no type if transient)
let valid_covariant_ooml_type = (base, covariant) => {
  if (!base) {
    return covariant === undefined ||
           valid_array(covariant);
  }

  if (valid_array(base)) {
    return valid_array(covariant) &&
           covariant.every((subtype, idx) => valid_covariant_ooml_subtype(subtype, covariant[idx]));
  }

  return valid_class_of_base(base, covariant);
};
