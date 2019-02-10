let traverse_o = fqn_components => {
  let rem = fqn_components.slice();
  let cur = o;
  while (rem.length) {
    cur = cur[rem.shift()];
  }

  return cur;
};
