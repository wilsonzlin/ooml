oomlArrayPrototype[__IP_OOML_ARRAY_PROTO_NORMALISE_INDEX] = function (name, index) {
  assert_typeof_r(name, index, TYPEOF_OOML_NATURAL);

  let actual_idx = index;
  if (index < 0) {
    actual_idx = this.length + index;
  }

  if (actual_idx < 0 || actual_idx >= this.length) {
    throw RangeError(`Out-of-range index ${ actual_idx }`);
  }

  return actual_idx;
};
