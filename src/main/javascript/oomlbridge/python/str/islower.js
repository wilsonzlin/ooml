str.islower = a => {
  // NOTE: This might not match Python
  return a.toLocaleLowerCase() == a;
};
