__delop.blshift = (a, b) => {
  return py_bin_op([
    {
      both: [is_integer_or_boolean],
      result: (a, b) => a << b,
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rLeftShift) && is_covariant(b, a)],
      result: (a, b) => b.rLeftShift(a),
    },

    {
      lhs: [{leftShift: is_function}],
      result: (a, b) => a.leftShift(b),
    },

    {
      rhs: [{rLeftShift: is_function}],
      result: (a, b) => b.rLeftShift(a),
    },
  ], a, b);
};
