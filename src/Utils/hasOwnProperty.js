Utils.hasOwnProperty = (obj, propName) => !!obj && Utils.typeOf(obj, TYPEOF_OBJECT) && Object.prototype.hasOwnProperty.call(obj, propName);
