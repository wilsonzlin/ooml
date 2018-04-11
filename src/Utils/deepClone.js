let Utils_deepClone = obj => {
  let cloned;
  if (Utils_isObjectLiteral(obj)) {
    cloned = Utils_createCleanObject();
    Object.keys(obj)
      .forEach(key => {
        cloned[key] = Utils_deepClone(obj[key]);
      });
  } else if (Array.isArray(obj)) {
    cloned = obj.map(item => Utils_deepClone(item));
  } else {
    cloned = obj;
  }
  return cloned;
};
