set.update = (a, b) => {
  b.forEach(v => {
    a.add(v);
  });
  return null;
};
