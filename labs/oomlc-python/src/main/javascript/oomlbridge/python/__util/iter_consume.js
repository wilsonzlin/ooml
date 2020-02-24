let iter_consume = (it, consumer) => {
  // Extremely small (probably impossible) chance,
  // but $consumer could return $py_handle_iters_stop
  py_handle_iter(it, v => void consumer(v));
};
