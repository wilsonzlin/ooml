// a > b
set.__gt = (a, b) => {
  if (a.size <= b.size) {
    return false;
  }
  return set_all_in_other(b, a);
};
