let Utils_isObjectLiteral = (obj) => !!obj && Utils_typeOf(obj, TYPEOF_OBJECT) &&
                                 (obj.constructor == Object || Object.getPrototypeOf(obj) === null);
