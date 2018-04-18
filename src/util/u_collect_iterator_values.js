let u_collect_iterator_values = iterator => {
  let vals = [];
  let it;

  while (!(it = iterator.next()).done) {
    vals.push(it.value);
  }

  return vals;
};
