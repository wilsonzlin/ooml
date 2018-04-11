let Utils_hasOwnProperty = (obj, propName) => !!obj && Utils_typeOf(obj, TYPEOF_OBJECT) &&
                                          Object.prototype.hasOwnProperty.call(obj, propName);
