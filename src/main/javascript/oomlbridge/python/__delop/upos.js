__delop.upos = a => {
  return py_un_op([
    {
      op: [{toPositive: is_function}],
      result: a => a.toPositive(),
    },
  ], a);
};
