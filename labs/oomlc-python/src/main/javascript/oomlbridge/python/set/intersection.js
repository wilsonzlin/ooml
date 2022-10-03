set.intersection = (a, b) => {
  let tmp = new Set();
  a.forEach(v => {
    if (b.has(v)) {
      tmp.add(v);
    }
  });
  return tmp;
};
