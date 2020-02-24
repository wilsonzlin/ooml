list.sort = (seq, key, reverse) => {
  key = assert_param("key", key, nullable_is(is_function), null);
  reverse = assert_param("reverse", reverse, is_boolean, false);
  let dir_mul = reverse ? -1 : 1;

  // NOTE: [ooml] Does not guarantee that $key is only called
  // once per value; could use separate data structure to cache
  // $key results, but that would reduce in-place sorting efficiency

  // NOTE: JS .sort does not guarantee stability
  seq.sort((a, b) => {
    if (key) {
      a = key(a);
      b = key(b);
    }

    return py_cmp(a, b) * dir_mul;
  });

  return null;
};
