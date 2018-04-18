let valid_json_value = value => {
  return u_is_a_type(__primitive_types_js, value) ||
         valid_json_array(value) ||
         valid_json_object(value);
};
