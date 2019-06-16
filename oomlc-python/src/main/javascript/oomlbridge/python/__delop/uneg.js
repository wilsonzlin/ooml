__delop.uneg = a => {
  return py_un_op([
    {
      op: [is_number_or_boolean],
      result: a => -a,
    },

    {
      op: [{toNegative: is_function}],
      result: a => a.toNegative(),
    },
  ], a);
};
