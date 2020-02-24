__delop.or = (a, b) => {
  return py_is_True(a) ? b : a;
};
