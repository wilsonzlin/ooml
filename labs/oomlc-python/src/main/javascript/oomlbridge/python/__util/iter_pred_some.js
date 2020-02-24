let iter_pred_some = (it, predicate) => {
  let some = false;
  py_handle_iter(it, v => {
    if (predicate(v)) {
      some = true;
      return py_handle_iters_stop;
    }
  });
  return some;
};
