let assert_is_type_r = (name, val, type) => {
  if (!u_is_type(val, type)) {
    throw TypeError(`Value for "${name}" is not of type ${type}`);
  }
  return val;
};
