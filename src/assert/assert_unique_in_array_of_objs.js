let assert_unique_in_array_of_objs = (name, obj_key, obj, array_of_objs) => {
  if (array_of_objs.some(other_obj => other_obj[obj_key] === obj[obj_key])) {
    throw ReferenceError(`"${obj[obj_key]}" ${name} already exists`);
  }
};
