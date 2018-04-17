let ClassFieldBuilder = function () {
};

let ClassFieldBuilderPrototype = ClassFieldBuilder.prototype = u_new_clean_object();

ClassFieldBuilderPrototype.setName = function (name) {
  this[__BC_CLASSFIELD_NAME] = assert_valid_r("name", name, valid_property_or_method_name);
};

ClassFieldBuilderPrototype.setValue = function (value) {
  this[__BC_CLASSFIELD_DEFAULTVALUE] = assert_not_undefined_r("default value", value);
};

ClassFieldBuilderPrototype[__IP_BUILDER_PROTO_COMPILE] = function () {
  // Check required values have been provided
  assert_set("name", __BC_CLASSFIELD_NAME, this);
  assert_set("default value", __BC_CLASSFIELD_DEFAULTVALUE, this);

  // Need to compile to make a copy, even with identical data
  return generate_bc_from_builder(this);
};
