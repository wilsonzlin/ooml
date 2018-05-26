let set_all_in_other = (a, b) => {
  return iter_pred_every(a.values(), v => {
    return b.has(v);
  });
};
