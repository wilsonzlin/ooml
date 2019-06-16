set.intersection_update = (a, b) => {
  a.forEach(v => {
    if (!b.has(v)) {
      a.delete(v);
    }
  });
  return null;
};
