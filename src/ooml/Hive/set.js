oomlHivePrototype.set = function(key, value, cb) {
  if (!__primitive_types_s.has(value) && value !== null) {
    throw TypeError(`Hive value must be a primitive or null`);
  }
  this[__IP_OOML_HIVE_PROTO_GET_OR_SET](key, value, cb);
};
