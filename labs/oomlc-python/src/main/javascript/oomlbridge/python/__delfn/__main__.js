let __delfn = create_clean_object();

let __delfn_map = create_clean_object();

[
  [int, is_integer], // Put `int` before `float`
  [float, is_number],
  [list, is_array],
  [set, is_set],
  [dict, is_map],
].forEach(config => {
  Object.keys(config[0]).forEach(method_name => {
    if (!/^__/.test(method_name) && is_function(type[method_name])) {
      if (!__delfn[method_name]) {
        __delfn_map[method_name] = [];

        __delfn[method_name] = function (callee) {
          let special_type = __delfn_map[method_name].find(config => {
            if (config[1](callee)) {
              return config[0];
            }
          });

          if (special_type) {
            // Callee is Python builtin, so map to bridged method
            return special_type[method_name].apply(arguments);
          }

          // Callee is regular object, so get method and call it
          let method = py_access(callee, method_name);
          if (!is_function(method)) {
            throw TypeError(`Attribute is not callable`);
          }

          // TODO Use py_call
          return Function.prototype.apply.apply(method, arguments);
        };
      }

      __delfn_map[method_name].push();
    }
  });
});
