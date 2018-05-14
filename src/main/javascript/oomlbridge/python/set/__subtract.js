set.__subtract = (a, b) => {
  let tmp = new Set(a);
  b.forEach(v => {
    tmp.delete(v);
  });
  return tmp;
};
