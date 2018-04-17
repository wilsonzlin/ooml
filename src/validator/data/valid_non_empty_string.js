let valid_non_empty_string = str => {
  return u_typeof(str, TYPEOF_STRING) &&
         !!str.trim();
};
