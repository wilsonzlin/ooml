let u_is_type = (val, type) => {
  switch (type) {
  case TYPEOF_OOML_NULL:
    return val === null;

  case TYPEOF_NUMBER:
  case TYPEOF_BOOLEAN:
  case TYPEOF_STRING:
  case TYPEOF_FUNCTION:
    return u_typeof(val, type);

  case TYPEOF_OOML_NATURAL:
  case TYPEOF_OOML_INTEGER:
    return u_typeof(val, TYPEOF_NUMBER) &&
           isFinite(val) &&
           Math.floor(val) === val &&
           (type != TYPEOF_OOML_NATURAL || val >= 0);

  case TYPEOF_OOML_DECIMAL:
    return u_typeof(val, TYPEOF_NUMBER) &&
           isFinite(val); // Returns false on NaN and +/-Infinity
  }
};
