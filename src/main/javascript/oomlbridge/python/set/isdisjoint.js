set.isdisjoint = (a, b) => {
  return all_iterator(a.values(), v => {
    return !b.has(v);
  });
};
