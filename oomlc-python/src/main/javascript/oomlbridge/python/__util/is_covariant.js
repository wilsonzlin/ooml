// Checks if the constructor for $a is a subclass of the constructor for $b
// NOTE: Must be a descendant, can't be the same class
let is_covariant = (a, b) => {
  return is_object(a) &&
         is_object(b) &&
         get_constructor(a) != get_constructor(b) &&
         is_instance(get_constructor(b), a);
};
