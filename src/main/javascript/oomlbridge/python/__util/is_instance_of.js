let is_instance_of = (a, type) => {
  return is_object(a) &&
         is_function(type) &&
         a instanceof type;
};
