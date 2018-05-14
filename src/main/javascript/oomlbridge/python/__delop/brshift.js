__delop.brshift = (a, b) => {
  return py_bin_op([
    {
      both: [is_integer_or_boolean],
      result: (a, b) => a >> b,
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rRightShift) && is_covariant(b, a)],
      result: (a, b) => b.rRightShift(a),
    },

    {
      lhs: [{rightShift: is_function}],
      result: (a, b) => a.rightShift(b),
    },

    {
      rhs: [{rRightShift: is_function}],
      result: (a, b) => b.rRightShift(a),
    },
  ], a, b);
};
