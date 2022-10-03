let generate_bc_from_builder = builder => {
  let bc = u_new_clean_object();

  u_enumerate(builder, (val, key) => {
    // Don't copy internal properties
    if (!/^__/.test(key)) {
      bc[key] = u_deep_clone(val);
    }
  });

  return bc;
};
