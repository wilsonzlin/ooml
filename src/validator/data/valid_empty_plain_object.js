let valid_empty_plain_object = obj => {
  return valid_plain_object(obj) &&
         !u_keys(obj).length;
};
