OOMLArrayProto.get = function (idx) {
  let oomlArray = this;

  let arr = oomlArray[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY];

  let realIdx = idx;
  if (idx < 0) {
    realIdx = oomlArray.length + idx;
  }

  let instance = arr[realIdx];
  if (!instance) {
    throw RangeError(`The offset at index ${ idx } is not a valid offset`);
  }

  return instance;
};
