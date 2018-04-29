let u_is_a_type = (val, types) => {
  return types.some(type => u_typeof(val, type));
};
