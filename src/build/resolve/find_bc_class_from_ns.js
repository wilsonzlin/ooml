let find_bc_class_from_ns = (namespace, c) => {
  return namespace && namespace[__BC_NS_CLASSES]
    .find(k => k[__BC_CLASS_NAME] == c);
};
