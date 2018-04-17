let find_bc_ns_from_mod = (module, ns) => {
  return module &&
         module[__BC_MOD_NAMESPACES].find(n => n[__BC_NS_NAME] == ns);
};
