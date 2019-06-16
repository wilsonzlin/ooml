let valid_property_or_method_reference = ref => {
  return u_typeof(ref, TYPEOF_STRING) &&
         /^this\./.test(ref) &&
         valid_property_or_method_name(ref.slice(5));
};
