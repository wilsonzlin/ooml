// a <= b
set.issubset = (a, b) => {
  if (a.size > b.size) {
    return false;
  }
  return set_all_in_other(a, b);
};
