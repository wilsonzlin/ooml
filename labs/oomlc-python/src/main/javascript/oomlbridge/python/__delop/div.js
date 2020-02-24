__delop.div = (a, b) => {
  return py_bin_op([
    {
      both: [is_number_or_boolean],
      result: (a, b) => py_num_div(a, b),
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rDivide) && is_covariant(b, a)],
      result: (a, b) => b.rDivide(a),
    },

    // a.divide(b)
    {
      lhs: [{divide: is_function}],
      result: (a, b) => a.divide(b),
    },

    // b.rDivide(a)
    {
      rhs: [{rDivide: is_function}],
      result: (a, b) => b.rDivide(a),
    },
  ], a, b);
};
