let find_bc_method_from_class = (klass, method) => {
  return klass[__BC_CLASS_METHODS] && klass[__BC_CLASS_METHODS][method];
};
