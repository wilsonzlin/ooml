let is_instance = (type, a) => {
  return is_object(a) &&
         is_function(type) &&
         a instanceof type;
};
