let fill_o = (fqn_components, cls) => {
  let rem = fqn_components.slice();
  let cur = o;
  while (rem.length > 1 && cur[rem[0]]) {
    cur = cur[rem.shift()];
  }

  while (rem.length > 1) {
    cur = cur[rem.shift()] = u_new_clean_object();
  }

  let base = rem.shift();
  let filler = cur[base];
  cur[base] = cls;
  if (filler) {
    // Filler previously existed at FQN
    u_assign(cls, filler);
  }
};
