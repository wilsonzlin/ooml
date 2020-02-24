str.partition = (a, sep) => {
  sep = assert_param("sep", sep, is_string);

  assert(sep.length, ValueError, "Empty separator");

  let idx = a.indexOf(sep);
  let middle;
  if (idx == -1) {
    idx = a.length;
    middle = "";
  } else {
    middle = a[idx];
  }

  // TODO Return Tuple
  return [a.slice(0, idx), middle, a.slice(idx)];
};
