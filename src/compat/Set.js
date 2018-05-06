// IE9 does not have Set
// IE10 does not have Set.forEach
// IE11 does not have Set.values
// Don't use !!window.Set as this may be used in Node.js
// Don't use u_typeof as Set may not exist
let __compat_Set = typeof Set == TYPEOF_FUNCTION && !!Set.prototype.values;
