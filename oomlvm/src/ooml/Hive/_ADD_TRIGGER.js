oomlHivePrototype[__IP_OOML_HIVE_PROTO_ADD_TRIGGER] = function (add_to, trigger, callback) {
  assert_typeof_r("callback", callback, TYPEOF_FUNCTION);

  let _this = this;

  let entry = {fn: callback};

  if (u_typeof(trigger, TYPEOF_STRING)) {
    entry.str = trigger;
  } else if (trigger instanceof RegExp) {
    entry.regex = trigger;
  } else {
    throw TypeError(`Trigger is not a string or RegExp instance`);
  }

  add_to.push(entry);

  return _this;
};
