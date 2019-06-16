let get_default_value_for_type = (type, nullable) => {
  if (!type || !__primitive_types_s.has(type) || nullable) {
    return null;
  }

  switch (type) {
  case TYPEOF_NUMBER:
    return 0;

  case TYPEOF_BOOLEAN:
    return false;

  case TYPEOF_STRING:
    return "";
  }
};
