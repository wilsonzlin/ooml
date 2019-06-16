let u_define_data_property = (obj, prop, value, writable) => {
  u_define_property(obj, prop, {
    value: value,
    writable: writable,
  });
};
