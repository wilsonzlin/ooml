set.symmetric_difference = (a, b) => {
  let tmp = new Set();
  a.forEach(v => {
    if (!b.has(v)) {
      tmp.add(v);
    }
  });
  b.forEach(v => {
    if (!a.has(v)) {
      tmp.add(v);
    }
  });
  return tmp;
};
