// Do not use arrow function, as it requires `arguments`
let u_assign = function () {
  let ret = arguments[0];
  if (u_typeof(ret.next, TYPEOF_FUNCTION)) {
    ret = u_collect_iterator_values(ret);
  }

  // Don't use validator/* as not loaded yet
  if (u_typeof(ret.length, TYPEOF_NUMBER)) {
    // WARNING: Don't use .concat as that doesn't work with array-like objects
    // e.g. [].concat(NodeList(div, span)) becomes [NodeList], not [div, span]

    for (let i = 1; i < arguments.length; i++) {
      let seq = arguments[i];

      if (seq) {
        if (u_typeof(seq.length, TYPEOF_NUMBER)) {
          Array.prototype.push.apply(ret, seq);

        } else if (u_typeof(seq.next, TYPEOF_FUNCTION)) {
          Array.prototype.push.apply(ret, u_collect_iterator_values(seq));
        }
      }
    }

  } else {
    // Don't pass $arguments (V8 perf killer)
    for (let i = 0; i < arguments.length; i++) {
      let obj = arguments[i];

      // Don't use instanceof as that makes it incompatible with clean objects
      if (obj && u_typeof(obj, TYPEOF_OBJECT)) {
        u_enumerate(obj, (val, prop) => {
          ret[prop] = val;
        });
      }
    }
  }

  return ret;
};
