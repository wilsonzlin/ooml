__delop.and = (a, b) => {
  return py_is_True(a) ? a : b;
};
