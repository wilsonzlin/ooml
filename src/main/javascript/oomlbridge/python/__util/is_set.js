let is_set = a => {
  // Set support is not this function's responsibility;
  // ensure polyfill is already loaded
  return a instanceof Set;
};
