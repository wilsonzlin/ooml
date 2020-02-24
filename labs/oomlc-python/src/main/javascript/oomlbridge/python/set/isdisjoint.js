set.isdisjoint = (a, b) => {
  return iter_pred_every(a.values(), v => {
    return !b.has(v);
  });
};
