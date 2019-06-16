let py_get_len = a => {
  if (is_set(a) || is_map(a)) {
    return a.size;

  } else if (!is_function(a) && is_number(get_prop(a, "length"))) {
    // WARNING: Set and Map also have .length, but it's always zero
    // For JS builtins and old libraries ONLY
    // NOTE: AIL dictates that `length` must be a function
    // NOTE: Functions have .length
    return a.length;

  } else if (is_function(get_prop(a, "length"))) {
    return a.length();
  }

  // Return undefined by default
};
