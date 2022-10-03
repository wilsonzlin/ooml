oomlTablePrototype.toJSON = function (start, end) {
  let _this = this;

  let arr = _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];

  if (start != undefined) {
    start = _this[__IP_OOML_ARRAY_PROTO_NORMALISE_INDEX]("start", start);
  } else {
    start = 0;
  }

  if (end != undefined) {
    end = _this[__IP_OOML_ARRAY_PROTO_NORMALISE_INDEX]("end", end);
  } else {
    end = arr.length;
  }

  let ret = [];

  for (let i = start; i < end; i++) {
    ret.push(arr[i][__IP_OOML_OBJ_PROTO_SERIALISE]());
  }

  return ret;
};
