set.union = (a, b) => {
  let tmp = new Set(a);
  b.forEach(v => {
    tmp.add(v);
  });
  return tmp;
};
