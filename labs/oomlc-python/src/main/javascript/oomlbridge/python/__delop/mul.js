__delop.mul = (a, b) => {
  return py_bin_op([
    // 13 * 4.7, True * False, -8.33 * True
    {
      both: [is_number_or_boolean],
      result: (a, b) => a * b,
    },

    // [1, 2, 3] * 3, True * [44, 7]
    {
      lhs: [is_array],
      rhs: [is_integer_or_boolean],
      commutative: true,
      result: list.__multiply,
    },

    // "abc" * 3, False * "abba"
    {
      lhs: [is_string],
      rhs: [is_integer_or_boolean],
      commutative: true,
      result: (a, b) => a.repeat(b),
    },

    // Reflective operator on RHS takes precedence
    // if RHS's type is a subtype of LHS's
    {
      rhs: [(b, a) => is_function(b.rMultiply) && is_covariant(b, a)],
      result: (a, b) => b.rMultiply(a),
    },

    // a.multiply(b)
    {
      lhs: [{multiply: is_function}],
      result: (a, b) => a.multiply(b),
    },

    // b.rMultiply(a)
    {
      rhs: [{rMultiply: is_function}],
      result: (a, b) => b.rMultiply(a),
    },
  ], a, b);
};
