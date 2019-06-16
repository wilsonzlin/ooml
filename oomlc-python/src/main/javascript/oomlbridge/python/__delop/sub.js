__delop.sub = (a, b) => {
  return py_bin_op([
    {
      both: [is_number_or_boolean],
      result: (a, b) => a - b,
    },

    {
      both: [is_set],
      result: set.difference,
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rSubtract) && is_covariant(b, a)],
      result: (a, b) => b.rSubtract(a),
    },

    {
      lhs: [{subtract: is_function}],
      result: (a, b) => a.subtract(b),
    },

    {
      rhs: [{rSubtract: is_function}],
      result: (a, b) => b.rSubtract(a),
    },
  ], a, b);
};
