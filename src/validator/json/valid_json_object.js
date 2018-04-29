let valid_json_object = obj => {
  return valid_object_literal(obj) &&
         u_keys(obj).every(k => valid_json_value(obj[k]));
};
