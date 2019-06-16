oomlHivePrototype[__IP_OOML_HIVE_PROTO_GET_OR_SET] = function (key, value, cb) {
  // Guarantee definite async
  setTimeout(() => {
    let _this = this;

    let is_set = value !== undefined;

    let queue = _this[is_set ? __IP_OOML_HIVE_OWN_SETTERS : __IP_OOML_HIVE_OWN_GETTERS].slice();

    let old_value = _this[__IP_OOML_HIVE_OWN_VALUES][key];

    function try_complete (rv) {
      if (rv === undefined) {
        if (queue.length) {
          next();

        } else {
          if (is_set) {
            rv = value;

          } else {
            rv = _this[__IP_OOML_HIVE_OWN_VALUES][key];
          }
        }
      }

      if (rv !== undefined) {
        if (is_set) {
          if (rv !== old_value) {
            // Call change listeners
            u_iterate(_this[__IP_OOML_HIVE_OWN_CHANGELISTENERS], cl => {
              let regex_matches;
              if ((cl.regex && (regex_matches = cl.regex.test(key))) || cl.str === key) {
                // Use setTimeout to prevent errors from obstructing other listeners
                setTimeout(() => {
                  cl.fn(regex_matches || key);
                });
              }
            });

            // Update bindings
            if (_this[__IP_OOML_HIVE_OWN_BINDINGS][key]) {
              u_iterate(_this[__IP_OOML_HIVE_OWN_BINDINGS][key], (inst, id) => {
                if (!inst) {
                  // Could be deleted
                  return;
                }
                inst[__IP_OOML_OBJ_PROTO_HANDLE_BINDING_CHANGE](id, rv);
              });
            }
          }
          _this[__IP_OOML_HIVE_OWN_VALUES][key] = rv;
          cb(null);

        } else {
          cb(null, rv);
        }
      }
    }

    function handle_error (original_error) {
      // Wrap in error object so that even if $original_error is not an object,
      // an error object is always passed
      cb(new ooml.Hive.GetterOrSetterError(key, original_error));
    }

    function next () {
      let gs = queue.shift();

      let gs_fn_arg = gs.regex && gs.regex.exec(key);
      if (!gs_fn_arg) {
        gs_fn_arg = key === gs.str ? key : undefined;
      }

      // $gs_fn_arg is either a string (possibly empty) or an array-like RegExp matches object
      if (gs_fn_arg != undefined) {
        let gs_rv;

        try {
          gs_rv = gs.fn(gs_fn_arg);
        } catch (e) {
          handle_error(e);
          return;
        }

        if (__compat_Promise && gs_rv instanceof Promise) {
          gs_rv
            .then(try_complete)
            .catch(handle_error);

        } else {
          try_complete(gs_rv);
        }

      } else {
        try_complete();
      }
    }

    try_complete();
  });
};
