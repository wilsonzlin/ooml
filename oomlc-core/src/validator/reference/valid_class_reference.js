let valid_class_reference = ref => {
  if (!u_typeof(ref, TYPEOF_STRING)) {
    return false;
  }

  return ref.split(".").every(p => {
    return valid_class_name(p);
  });
};
