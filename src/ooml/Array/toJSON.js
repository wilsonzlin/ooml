oomlArrayPrototype.toJSON = function (start, end, indentation) {
  if (!u_is_type(TYPEOF_OOML_NATURAL, indentation) || indentation < 0 || indentation > 10) {
    throw RangeError(`Invalid indentation value`);
  }

  return JSON.stringify(this.toArray(start, end), undefined, indentation);
};
