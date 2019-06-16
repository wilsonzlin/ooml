__delop.floordiv = (a, b) => {
  return py_bin_op([
    {
      both: [is_number_or_boolean],
      result: (a, b) => Math.floor(num.__divide(a, b)),
    },
  ], a, b);
};
