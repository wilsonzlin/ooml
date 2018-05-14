__delop.bor = (a, b) => {
  return py_bin_op([
    {
      lhs: [is_integer_or_boolean],
      rhs: [is_integer],
      result: (a, b) => a | b,
    },

    {
      lhs: [is_integer],
      rhs: [is_boolean],
      result: (a, b) => a | b,
    },

    {
      both: [is_boolean],
      result: (a, b) => a || b,
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rDisjunction) && is_covariant(b, a)],
      result: (a, b) => b.rDisjunction(a),
    },

    // a.disjunction(b)
    {
      lhs: [{disjunction: is_function}],
      result: (a, b) => a.disjunction(b),
    },

    // b.rDisjunction(a)
    {
      rhs: [{rDisjunction: is_function}],
      result: (a, b) => b.rDisjunction(a),
    },
  ], a, b);
};
