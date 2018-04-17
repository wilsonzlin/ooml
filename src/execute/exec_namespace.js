let exec_namespace = (bc_ns, module) => {
  let bc_classes = bc_ns[__BC_NS_CLASSES];

  // Either no name and no chance of duplicates,
  // or name and already checked when compiled

  let namespace = u_new_clean_object();

  u_iterate(bc_classes, bc_class => {
    namespace[bc_class[__BC_CLASS_NAME]] = exec_class(bc_class, module, namespace);
  });

  if (module) {
    // For when called by exec_module
    return namespace;
  }
};
