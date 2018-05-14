__delop.exp = (a, b) => {
  return py_bin_op([
    {
      both: [is_number_or_boolean],
      result: (a, b) => a ** b,
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rExponentiate) && is_covariant(b, a)],
      result: (a, b) => b.rExponentiate(a),
    },

    // a.exponentiate(b)
    {
      lhs: [{exponentiate: is_function}],
      result: (a, b) => a.exponentiate(b),
    },

    // b.rExponentiate(a)
    {
      rhs: [{rExponentiate: is_function}],
      result: (a, b) => b.rExponentiate(a),
    },
  ], a, b);
};
