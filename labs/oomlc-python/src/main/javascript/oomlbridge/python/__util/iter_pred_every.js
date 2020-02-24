let iter_pred_every = (it, predicate) => {
  let every = true;
  py_handle_iter(it, v => {
    if (!predicate(v)) {
      every = false;
      return py_handle_iters_stop;
    }
  });
  return every;
};
