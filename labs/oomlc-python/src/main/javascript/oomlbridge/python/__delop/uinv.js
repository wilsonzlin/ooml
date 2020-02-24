__delop.uinv = a => {
  return py_un_op([
    {
      op: [is_integer_or_boolean()],
      result: a => ~a,
    },

    {
      op: [{toComplement: is_function}],
      result: a => a.toComplement(),
    },
  ], a);
};
