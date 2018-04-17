let u_is_a_type = (types, val) => {
  return types.some(type => u_is_type(type, val));
};
