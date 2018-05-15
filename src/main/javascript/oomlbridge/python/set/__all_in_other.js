let set_all_in_other = (a, b) => {
  return all_iterator(a.values(), v => {
    return b.has(v);
  });
};
