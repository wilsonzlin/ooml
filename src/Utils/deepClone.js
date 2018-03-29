Utils.deepClone = obj => {
  let cloned;
  if (Utils.isObjectLiteral(obj)) {
    cloned = Utils.createCleanObject();
    Object.keys(obj)
      .forEach(key => {
        cloned[key] = Utils.deepClone(obj[key]);
      });
  } else if (Array.isArray(obj)) {
    cloned = obj.map(item => Utils.deepClone(item));
  } else {
    cloned = obj;
  }
  return cloned;
};
