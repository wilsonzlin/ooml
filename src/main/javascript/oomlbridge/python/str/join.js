str.join = (a, iter) => {
  return iter_collect(py_create_iterator(iter)).join(a);
};
