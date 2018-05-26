let resolve_bc_class_reference = (ref, from) => {
  // $ref and $from are assumed to be valid class FQN strings
  let norm;

  if (from[0] == ".") {
    norm = from.split(".");
    ref = ref.slice(1);

    while (ref[0] == ".") {
      if (norm.length <= 1) {
        throw ReferenceError(`Relative class reference "${ref}" exceeds module`);
      }
      norm.pop();
      ref = ref.slice(1);
    }

    if (ref) {
      ref.split(".").forEach(p => norm.push(p));
    }

  } else {
    norm = ref.split(".");
  }

  let deref = __compiled_classes;
  u_iterate(norm, p => {
    deref = deref[p];

    if (!deref) {
      throw ReferenceError(`Non-existent class reference "${ref}"`);
    }
  });

  // Return the context of the dereferenced class
  return [module, namespace, deref];
};
