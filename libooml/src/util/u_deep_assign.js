// Do not use arrow function, as it requires `arguments`
let u_deep_assign = function (target, src) {
  u_enumerate(src, (val, prop) => {
    // Don't use validator/* as not loaded yet
    // Don't use instanceof as that makes it incompatible with clean objects
    if (val && u_typeof(val, TYPEOF_OBJECT) && target[prop] && u_typeof(target[prop], TYPEOF_OBJECT)) {
      u_deep_assign(target[prop], val);
    } else {
      target[prop] = val;
    }
  });
};
