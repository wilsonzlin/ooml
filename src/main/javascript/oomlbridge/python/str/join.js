str.join = (a, iter) => {
  let parts = [];
  py_iterate(iter, p => {
    parts.push(p);
  });
  return parts.join(a);
};
