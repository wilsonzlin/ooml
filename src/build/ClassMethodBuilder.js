let ClassMethodBuilder = function () {
};

let ClassMethodBuilderPrototype = ClassMethodBuilder.prototype = u_new_clean_object();

ClassMethodBuilderPrototype.setName = function (name) {
  this[__BC_CLASSMETHOD_NAME] = assert_valid_r("name", name, valid_property_or_method_name);
};

ClassMethodBuilderPrototype.setFunction = function (fn) {
  this[__BC_CLASSMETHOD_FUNCTION] = assert_typeof_r("function", fn, TYPEOF_FUNCTION);
};

ClassMethodBuilderPrototype[__IP_BUILDER_PROTO_COMPILE] = function () {
  // Check required values have been provided
  assert_set("name", __BC_CLASSMETHOD_NAME, this);
  assert_set("function", __BC_CLASSMETHOD_FUNCTION, this);

  // Need to compile to make a copy, even with identical data
  return generate_bc_from_builder(this);
};
