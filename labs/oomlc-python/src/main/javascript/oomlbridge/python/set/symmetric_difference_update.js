set.symmetric_difference_update = (a, b) => {
  a.forEach(v => {
    if (b.has(v)) {
      a.delete(v);
    }
  });
  b.forEach(v => {
    if (!a.has(v)) {
      a.add(v);
    }
  });
  return null;
};
