// Checks if the constructor for $a is a subclass of the constructor for $b
let is_covariant = (a, b) => {
  return is_object(a) &&
         is_object(b) &&
         is_instance_of(a, get_constructor(b));
};
