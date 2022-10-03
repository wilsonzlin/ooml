let assert_not_undefined_r = (name, val) => {
  if (val === undefined) {
    throw TypeError(`"${name}" is undefined`);
  }
  return val;
};
