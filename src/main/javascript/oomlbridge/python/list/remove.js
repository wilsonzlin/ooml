list.remove = (seq, x) => {
  let i = seq.findIndex(e => py_is_eq(e, x));
  assert(i > -1, ValueError, "Element not in list");
  seq.splice(i, 1);
  return null;
};
