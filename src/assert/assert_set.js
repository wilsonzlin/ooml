let assert_set = (name, key, map) => {
  if (!u_has_own_property(map, key)) {
    throw ReferenceError(`"${name}" missing`);
  }
};
