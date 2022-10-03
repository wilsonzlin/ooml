let ClassFieldBuilder = function () {
};

let ClassFieldBuilderPrototype = ClassFieldBuilder.prototype = u_new_clean_object();

ClassFieldBuilderPrototype.setName = function (name) {
  this[__BC_CLASSFIELD_NAME] = assert_valid_r("name", name, valid_field_name);
};

ClassFieldBuilderPrototype.setValue = function (raw_value) {
  this[__BC_CLASSFIELD_VALUE] = assert_typeof_r("value", raw_value, TYPEOF_STRING);
};

ClassFieldBuilderPrototype[__IP_BUILDER_PROTO_VALIDATE] = function () {
  // Check required values have been provided
  assert_set("name", __BC_CLASSFIELD_NAME, this);
  assert_set("value", __BC_CLASSFIELD_VALUE, this);
};
