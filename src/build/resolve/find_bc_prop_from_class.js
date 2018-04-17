let find_bc_prop_from_class = (klass, prop) => {
  return klass[__BC_CLASS_PROPERTIES] && klass[__BC_CLASS_PROPERTIES][prop];
};
