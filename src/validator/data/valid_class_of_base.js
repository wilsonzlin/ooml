let valid_class_of_base = (base, k) => {
  return u_typeof(k, TYPEOF_FUNCTION) && (base == k || base.prototype instanceof k);
};
