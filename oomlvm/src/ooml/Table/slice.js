oomlTablePrototype.slice = function (start, end) {
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

  return arr.slice(start, end);
};
