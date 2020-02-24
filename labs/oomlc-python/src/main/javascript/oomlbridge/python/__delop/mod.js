__delop.mod = (a, b) => {
  return py_bin_op([
    {
      both: [is_number_or_boolean],
      result: (a, b) => py_num_mod(a, b),
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rModulo) && is_covariant(b, a)],
      result: (a, b) => b.rModulo(a),
    },

    {
      lhs: [{modulo: is_function}],
      result: (a, b) => a.modulo(b),
    },

    {
      rhs: [{rModulo: is_function}],
      result: (a, b) => b.rModulo(a),
    },
  ], a, b);
};
