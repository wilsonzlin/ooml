let get_hash = a => {
  if (is_number_or_boolean(a)) {
    return +a;

  } else if (is_set(a) || is_map(a) || is_array(a)) {
    throw TypeError(`Unhashable type`);

  } else if (is_object(a) && is_function(a.toHash)) {
    return a.toHash();

  } else {
    return a;
  }
};
