let resolve_bc_class_reference = (ref, from_module, from_namespace, from_class) => {
  // $ref is assumed to be a valid class reference string
  if (ref == "this") {
    // Self class reference
    if (!from_class) {
      throw ReferenceError(`Reference to "this" from non-class context`);
    }
    return from_class;
  }

  // All $from_* args should be bytecode
  // $from_namespace and $from_module can be null
  // $from_class can be null if instantiation
  // Names for $from_* bytecode should be already set, as well as group for $from_module
  let from_instantiation = !from_class;
  let from_anon_class = !from_namespace;
  let from_anon_class_or_ns = !from_module;
  let from_group_name = !from_anon_class_or_ns && from_module[__BC_MOD_GROUP];
  let from_anon_class_or_ns_or_module = !from_group_name;

  let parts = ref.split(".");
  let deref;

  let module = from_module;
  let namespace = from_namespace;

  switch (parts.length) {
  case 1:
    if (!from_instantiation && parts[0] == from_class[__BC_CLASS_NAME]) {
      // Can't refer to own class name using 1-part reference,
      // even if a class exists with the same name
      // (use `this` instead)
      throw SyntaxError(`Use "this" for self class reference`);
    }

    if (from_anon_class) {
      // From anonymous class or top-level instantiation
      deref = __compiled_bc_anon_classes[parts[0]];

    } else {
      // From named namespace or anonymous namespace
      deref = find_bc_class_from_ns(from_namespace, parts[0]);
    }
    break;

  case 2:
    if (from_anon_class_or_ns) {
      // From anonymous class or anonymous namespace
      module = __compiled_bc_modules[parts[0]];

    } else {
      // From named namespace
      // Can't refer to own namespace name using 2-part reference,
      // even if a namespace exists with the same name
      if (parts[0] == from_namespace[__BC_NS_NAME]) {
        throw ReferenceError(`Reference to own namespace`);
      }
      module = from_module;
    }

    namespace = find_bc_ns_from_mod(module, parts[0]);
    deref = find_bc_class_from_ns(namespace, parts[1]);
    break;

  case 3:
    // Cannot refer to own module name using 3-part reference,
    // even if a module exists with the same name
    if (!from_anon_class_or_ns && parts[0] == from_module[__BC_MOD_NAME]) {
      throw ReferenceError(`Reference to own module`);
    }

    module = __compiled_bc_modules[parts[0]];
    namespace = find_bc_ns_from_mod(module, parts[1]);
    deref = find_bc_class_from_ns(namespace, parts[2]);
    break;

  case 4:
    // Cannot refer to own group.mod name using 4-part reference
    // (can refer to own group though)
    if (!from_anon_class_or_ns_or_module &&
        parts[0] == from_group_name &&
        parts[1] == from_module[__BC_MOD_NAME]) {
      throw ReferenceError(`Reference to own group and module`);
    }

    module = find_bc_mod_from_group(__compiled_bc_groups[parts[0]], parts[1]);
    namespace = find_bc_ns_from_mod(module, parts[2]);
    deref = find_bc_class_from_ns(namespace, parts[3]);
  }

  if (!deref) {
    throw ReferenceError(`Non-existent class reference "${ref}"`);
  }

  // Return the context of the dereferenced class
  return [module, namespace, deref];
};
