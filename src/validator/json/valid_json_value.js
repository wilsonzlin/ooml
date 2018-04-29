let valid_json_value = value => {
  return u_is_a_type(value, __primitive_types) ||
         valid_json_array(value) ||
         valid_json_object(value);
};
