let get_hash = a => {
  if (is_number_or_boolean(a)) {
    return +a;

  } else if (is_object(a) && is_function(a.toHash)) {
    return a.toHash();

  } else {
    return a;
  }
};
