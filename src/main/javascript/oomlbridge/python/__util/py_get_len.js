let py_get_len = a => {
  if (is_set(a) || is_map(a)) {
    return a.size;

  } else if (is_function(get_prop(a, "length"))) {
    return a.length();
  }
};
