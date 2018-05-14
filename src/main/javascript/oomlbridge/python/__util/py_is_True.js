let py_is_True = a => {
  if (is_number_or_boolean(a)) {
    return !!a;

  } else {
    // len() could be undefined
    return py_get_len(a) !== 0;
  }
};
