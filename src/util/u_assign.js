// Do not use arrow function, as it requires `arguments`
let u_assign = function () {
  let ret = arguments[0];

  if (valid_object_literal(ret)) {
    // Don't pass $arguments (V8 perf killer)
    for (let i = 0; i < arguments.length; i++) {
      let obj = arguments[i];
      if (valid_object_literal(obj)) {
        u_enumerate(obj, (val, prop) => {
          ret[prop] = val;
        });
      }
    }

  } else {
    // WARNING: Don't use .concat as that doesn't work with array-like objects
    // e.g. [].concat(NodeList(div, span)) becomes [NodeList], not [div, span]
    for (let i = 1; i < arguments.length; i++) {
      if (arguments[i] && arguments[i].length) {
        Array.prototype.push.apply(ret, arguments[i]);
      }
    }
  }

  return ret;
};
