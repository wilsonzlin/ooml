// _p == Processes reference by removing prefix `this.`
let assert_valid_prop_or_method_reference_p_r = (name, ref) => {
  if (!valid_property_or_method_reference(ref)) {
    throw SyntaxError(`Malformed property or method reference "${ref}" for "${name}"`);
  }
  return ref.slice(5);
};
