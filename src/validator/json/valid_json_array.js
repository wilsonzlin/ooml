let valid_json_array = arr => {
  return valid_array(arr) &&
         arr.every(val => valid_json_value(val));
};
