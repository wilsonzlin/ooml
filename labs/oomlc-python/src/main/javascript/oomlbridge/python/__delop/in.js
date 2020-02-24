__delop.in = (a, b) => {
  return py_bin_op([
    {
      both: [is_string],
      result: (a, b) => b.indexOf(a) > -1,
    },

    {
      rhs: [is_array],
      result: (a, b) => b.some(e => py_is_eq(e, a)),
    },

    {
      rhs: [{has: is_function}], // This covers sets and maps
      result: (a, b) => b.has(a),
    },

    // TODO Iterator fallback
  ], a, b);
};
