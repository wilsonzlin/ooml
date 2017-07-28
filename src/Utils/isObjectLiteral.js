Utils.isObjectLiteral = (obj) => !!obj && Utils.typeOf(obj, TYPEOF_OBJECT) && (obj.constructor == Object || Object.getPrototypeOf(obj) === null);
