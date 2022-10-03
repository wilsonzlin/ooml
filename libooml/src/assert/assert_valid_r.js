let assert_valid_r = (name, val, validator) => {
  if (!validator(val)) {
    throw SyntaxError(`Invalid ${name} "${val}"`);
  }
  return val;
};
