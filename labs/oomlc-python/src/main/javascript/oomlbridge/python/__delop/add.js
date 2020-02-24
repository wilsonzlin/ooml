__delop.add = (a, b) => {
  return py_bin_op([
    {
      both: [is_string],
      result: (a, b) => a + b,
    },

    {
      both: [is_number_or_boolean],
      result: (a, b) => a + b,
    },

    {
      both: [is_array],
      result: (a, b) => a.concat(b),
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rAdd) && is_covariant(b, a)],
      result: (a, b) => b.rAdd(a),
    },

    {
      lhs: [{add: is_function}],
      result: (a, b) => a.add(b),
    },

    {
      rhs: [{rAdd: is_function}],
      result: (a, b) => b.rAdd(a),
    },
  ], a, b);
};
