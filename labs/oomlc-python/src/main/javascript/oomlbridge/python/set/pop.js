set.pop = a => {
  assert(a.size > 0, KeyError, "Set is empty");
  return a.values().next().value;
};
