let valid_plain_object = obj => {
  return !!obj &&
         u_typeof(obj, TYPEOF_OBJECT) &&
         (obj.constructor == Object || Object.getPrototypeOf(obj) === null);
};
