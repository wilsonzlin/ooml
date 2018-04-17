let exec_module = (bc_mod) => {
  let name = bc_mod[__BC_MOD_NAME];
  let group = bc_mod[__BC_MOD_GROUP];
  let bc_namespaces = bc_mod[__BC_MOD_NAMESPACES];

  if (group) {
    // Ensure bytecode group object is available
    if (!__rt_bc_groups[group]) {
      __rt_bc_groups[group] = u_new_clean_object();

    } else if (__rt_bc_groups[group][name]) {
      // Just in case module accidently loaded twice (e.g. duplicate <script>)
      // or $bc_mod is recently compiled from a ModuleBuilder instance and uniqueness not checked yet
      throw ReferenceError(`Module "${name}" in group "${group}" already exists`);
    }

    // Ensure loaded group object is available
    if (!__rt_ld_groups[group]) {
      __rt_ld_groups[group] = u_new_clean_object();
    }
  }

  let module = u_new_clean_object();

  u_iterate(bc_namespaces, bc_ns => {
    module[bc_ns[__BC_NS_NAME]] = exec_namespace(bc_ns, module);
  });

  __rt_bc_modules[name] = bc_mod;
  __rt_ld_modules[name] = module;

  if (group) {
    __rt_bc_groups[group][name] = bc_mod;
    __rt_ld_groups[group][name] = module;
  }
};
