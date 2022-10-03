let is_map = a => {
  // Map support is not this function's responsibility;
  // ensure polyfill is already loaded
  return a instanceof Map;
};
