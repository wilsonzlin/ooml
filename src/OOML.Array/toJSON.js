OOMLArrayProto.toJSON = function (startIdx, endIdx, indentation) {
  if (!Utils_isType("natural", indentation) || indentation < 0 || indentation > 10) {
    throw RangeError(`Invalid toJSON indentation value`);
  }

  return JSON.stringify(this.toArray(startIdx, endIdx), undefined, indentation);
};
