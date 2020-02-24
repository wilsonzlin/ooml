let py_cmp = (a, b) => {
  return py_bin_op([
    {
      both: [is_number_or_boolean],
      result: (a, b) => raw_compare(a, b),
    },

    {
      both: [is_string],
      result: (a, b) => raw_compare(a, b),
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.compareTo) && is_covariant(b, a)],
      result: (a, b) => b.compareTo(a),
    },

    // a.multiply(b)
    {
      lhs: [{compareTo: is_function}],
      result: (a, b) => a.compareTo(b),
    },

    // b.compareTo(a)
    {
      rhs: [{compareTo: is_function}],
      result: (a, b) => b.compareTo(a),
    },
  ], a, b);
};
