__delop.upos = a => {
  return py_un_op([
    {
      op: [is_number_or_boolean],
      result: a => +a, // Apply unary operator to convert booleans
    },

    {
      op: [{toPositive: is_function}],
      result: a => a.toPositive(),
    },
  ], a);
};
