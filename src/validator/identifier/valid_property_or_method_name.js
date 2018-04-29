let valid_property_or_method_name = name => {
  return u_typeof(name, TYPEOF_STRING) &&
         name.length >= 1 &&
         // Starting dollar sign
         name[0] != "$" &&
         // Double underscore prefix
         !(name[0] == "_" && name[1] == "_") &&
         // Trailing underscore
         name[name.length - 1] != "_" &&
         // Starting or trailing whitespace
         !/^\s|\s$/.test(name) &&
         !__reserved_prop_method_names_s.has(name);
};
