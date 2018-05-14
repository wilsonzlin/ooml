__fn.len = a => {
  let length = py_get_len(a);
  // WARNING: It shouldn't be possible for custom length function to return undefined (null is OK)
  if (is_undefined(length)) {
    throw TypeError(`object has no len()`);
  }
  return length;
};
