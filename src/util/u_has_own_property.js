let u_has_own_property = (obj, prop) => {
  return !!obj &&
         u_typeof(obj, TYPEOF_OBJECT) &&
         Object.prototype.hasOwnProperty.call(obj, prop);
};
