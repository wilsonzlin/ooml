OOMLInstanceProto.toJSON = function (indentation) {
  if (!Utils_isType("natural", indentation) || indentation < 0 || indentation > 10) {
    throw RangeError(`Invalid toJSON indentation value`);
  }

  return JSON.stringify(this.toObject(), undefined, indentation);
};
