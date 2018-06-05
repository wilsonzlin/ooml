let valid_subclass = (base, k) => {
  return u_typeof(k, TYPEOF_FUNCTION) && (k == base || k.prototype instanceof base);
};
