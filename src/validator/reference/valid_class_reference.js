let CLASS_REFERENCE_PART_VALIDATORS = [
  valid_class_name,
  valid_namespace_name,
  valid_module_name,
  valid_group_name,
];

let valid_class_reference = ref => {
  if (!u_typeof(ref, TYPEOF_STRING)) {
    return false;
  }

  if (ref == "this") {
    return true;
  }

  return ref.split(".").reverse().every((p, i) => {
    if (i > 3) {
      return false;
    }
    return CLASS_REFERENCE_PART_VALIDATORS[i](p);
  });
};
