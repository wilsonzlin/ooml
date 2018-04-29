// IE9 does not have Set
// IE10 does not have Set.forEach
// IE11 does not have Set.values
let __compat_Set = !!window.Set && !!Set.prototype.values;
