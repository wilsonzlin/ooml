let u_deep_clone = thing => {
  let cloned;

  if (valid_object_literal(thing)) {
    cloned = u_new_clean_object();
    u_enumerate(thing, (val, key) => {
      cloned[key] = u_deep_clone(val);
    });

  } else if (valid_array(thing)) {
    cloned = thing.map(item => u_deep_clone(item));

  } else {
    cloned = thing;
  }

  return cloned;
};
