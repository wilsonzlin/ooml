let assert_new_obj_prop = (name, prop, obj) => {
  if (u_has_own_property(obj, prop)) {
    throw ReferenceError(`"${prop}" ${name} already exists`);
  }
};
