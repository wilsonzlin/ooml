set.remove = (a, elem) => {
  assert(a.remove(elem), KeyError, "Element does not exist in set");
  return null;
};
