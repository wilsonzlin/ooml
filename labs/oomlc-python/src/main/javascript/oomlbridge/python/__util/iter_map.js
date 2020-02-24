let iter_map = (it, mapper) => {
  let mapping = [];
  py_handle_iter(it, v => mapping.push(mapper(v)));
  return mapping;
};
