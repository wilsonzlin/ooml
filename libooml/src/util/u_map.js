let u_map = (iterable, mapper) => {
  let ret = [];
  for (let i = 0; i < iterable.length; i++) {
    ret.push(mapper(iterable[i], i));
  }
  return ret;
};
