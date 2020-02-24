__delop.band = (a, b) => {
  return py_bin_op([
    {
      lhs: [is_integer_or_boolean],
      rhs: [is_integer],
      result: (a, b) => a & b,
    },

    {
      lhs: [is_integer],
      rhs: [is_boolean],
      result: (a, b) => a & b,
    },

    {
      both: [is_boolean],
      result: (a, b) => a && b,
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rConjunction) && is_covariant(b, a)],
      result: (a, b) => b.rConjunction(a),
    },

    // a.conjunction(b)
    {
      lhs: [{conjunction: is_function}],
      result: (a, b) => a.conjunction(b),
    },

    // b.rConjunction(a)
    {
      rhs: [{rConjunction: is_function}],
      result: (a, b) => b.rConjunction(a),
    },
  ], a, b);
};
