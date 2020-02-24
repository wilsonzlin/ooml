str.isupper = a => {
  // NOTE: This might not match Python
  return a.toLocaleUpperCase() == a;
};
