let Utils_getClassFromString = (classes, className) => {
  if (classes[className]) {
    return classes[className];
  }

  throw ReferenceError(`The class "${ className }" does not exist`);
};
