oomlArrayPrototype[__IP_OOML_ARRAY_PROTO_NORMALISE_INDEX] = function (name, index, for_splice) {
  assert_typeof_r(name, index, TYPEOF_NUMBER);

  let actual_idx = index;
  if (index < 0) {
    actual_idx = this.length + index;
  }

  if (for_splice) {
    actual_idx = Math.min(Math.max(0, actual_idx), this.length);

  } else {
    if (actual_idx < 0 || actual_idx >= this.length) {
      throw RangeError(`Out-of-range index ${ actual_idx }`);
    }
  }

  return actual_idx;
};
