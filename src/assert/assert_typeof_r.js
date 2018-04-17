let assert_typeof_r = (name, val, type) => {
  if (!u_typeof(val, type)) {
    throw TypeError(`Value for "${name}" is not of type ${type}`);
  }
  return val;
};
