__delop.bxor = (a, b) => {
  return py_bin_op([
    {
      lhs: [is_integer_or_boolean],
      rhs: [is_integer],
      result: (a, b) => a ^ b,
    },

    {
      lhs: [is_integer],
      rhs: [is_boolean],
      result: (a, b) => a ^ b,
    },

    {
      both: [is_boolean],
      result: (a, b) => !!(a ^ b),
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rExclusiveDisjunction) && is_covariant(b, a)],
      result: (a, b) => b.rExclusiveDisjunction(a),
    },

    // a.exclusiveDisjunction(b)
    {
      lhs: [{exclusiveDisjunction: is_function}],
      result: (a, b) => a.exclusiveDisjunction(b),
    },

    // b.rExclusiveDisjunction(a)
    {
      rhs: [{rExclusiveDisjunction: is_function}],
      result: (a, b) => b.rExclusiveDisjunction(a),
    },
  ], a, b);
};
