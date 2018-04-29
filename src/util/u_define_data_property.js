let u_define_data_property = (obj, prop, value, writable) => {
  Object.defineProperty(obj, prop, {
    value: value,
    writable: writable,
  });
};
