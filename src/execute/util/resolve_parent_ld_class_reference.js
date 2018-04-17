let resolve_parent_ld_class_reference = (ref, from_module, from_namespace) => {
  // $ref is assumed to refer to an existing runtime object

  // All $from_* args should be runtime objects
  // $from_namespace and $from_module can be null
  let from_anon_class = !from_namespace;
  let from_anon_class_or_ns = !from_module;

  let parts = ref.split(".");
  let deref;

  let module = from_module;
  let namespace = from_namespace;

  switch (parts.length) {
  case 1:
    if (from_anon_class) {
      // From anonymous class
      deref = __rt_ld_anon_classes[parts[0]];

    } else {
      // From named namespace or anonymous namespace
      deref = from_namespace[parts[0]];
    }
    break;

  case 2:
    if (from_anon_class_or_ns) {
      // From anonymous class or anonymous namespace
      module = __rt_ld_modules[parts[0]];

    } else {
      // From named namespace
      module = from_module;
    }

    namespace = module[parts[0]];
    deref = namespace[parts[1]];
    break;

  case 3:
    module = __rt_ld_modules[parts[0]];
    namespace = module[parts[1]];
    deref = namespace[parts[2]];
    break;

  case 4:
    module = __rt_ld_groups[parts[0]][parts[1]];
    namespace = module[parts[2]];
    deref = namespace[parts[3]];
  }

  // Return the context of the dereferenced class
  return deref;
};
