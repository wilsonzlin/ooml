// _s == Adds value to set
let assert_unique_in_stringset_s_r = (name, val, set) => {
  if (!u_typeof(val, TYPEOF_STRING)) {
    throw ReferenceError(`Can't identify ${name}`);
  }
  if (set.has(val)) {
    throw ReferenceError(`"${val}" ${name} already exists`);
  }
  set.add(val);
  return val;
};
