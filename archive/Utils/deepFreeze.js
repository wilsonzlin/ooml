let Utils_deepFreeze = obj => {
  Object.freeze(obj);
  Object.keys(obj)
    .forEach(key => {
      let val = obj[key];
      if (Utils_isObjectLiteral(val) || Array.isArray(val)) {
        Utils_deepFreeze(val);
      }
    });
  return obj;
};
