let assert_args_len = (provided, min, max) => {
  if (max === undefined) {
    max = min;
  }
  assert(provided >= min, TypeError, `Function requires at least ${min} positional arguments`);
  if (max !== false) {
    assert(provided <= max, TypeError, `Function takes at most ${max} positional arguments`);
  }
};
