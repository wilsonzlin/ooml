let valid_empty_object = obj => {
  return valid_object_literal(obj) &&
         !u_keys(obj).length;
};
