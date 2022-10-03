list.__multiply = (a, b) => {
  let res = [];
  for (let i = 0; i < b; i++) {
    push_all(res, a);
  }
  return res;
};
