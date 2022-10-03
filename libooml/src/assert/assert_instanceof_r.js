let assert_instanceof_r = (name, val, constructor, optional) => {
  // `null instanceof Object` works
  if (!(u_typeof(val, TYPEOF_OBJECT) && ((!val && optional) || val instanceof constructor))) {
    throw TypeError(`Value for ${name} is an invalid type of instance`);
  }
  return val;
};
