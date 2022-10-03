let u_enumerate = (enumerable, enumerator) => {
  u_iterate(u_keys(enumerable), key => {
    let val = enumerable[key];
    if (val !== undefined) {
      enumerator(val, key);
    }
  });
};
