Utils.isType = (type, value) => {
  if (Array.isArray(type)) {
    return type.some(t => Utils.isType(t, value));
  }
  switch (type) {
  case "null":
    return value === null;

  case "number":
  case "boolean":
  case "string":
  case "function":
    return typeof value == type;

  case "natural":
  case "integer":
    return Utils.typeOf(value, TYPEOF_NUMBER) &&
           isFinite(value) &&
           Math.floor(value) === value &&
           (type != "natural" || value >= 0);

  case "float":
    // Floats can have zero remainder, as there is no real difference between int and float in JS
    return Utils.typeOf(value, TYPEOF_NUMBER) &&
           isFinite(value); // Returns false on NaN and +/-Infinity

  case "Object":
    return Utils.isObjectLiteral(value);

  case "Array":
    return Array.isArray(value);

  default:
    throw new Error(`Unrecognised type for checking against`);
  }
};
