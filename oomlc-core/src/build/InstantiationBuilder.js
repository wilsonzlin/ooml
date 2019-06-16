let InstantiationBuilder = function () {
};

let InstantiationBuilderPrototype = InstantiationBuilder.prototype = u_new_clean_object();

InstantiationBuilderPrototype.setType = function (type) {
  this[__BC_INSTANTIATION_TYPE] = assert_valid_r("type", type, valid_class_reference);
};

InstantiationBuilderPrototype.setInitialState = function (state) {
  this[__BC_INSTANTIATION_INITIALSTATE] = assert_valid_r("state", state, valid_object_literal);
};

InstantiationBuilderPrototype[__IP_BUILDER_PROTO_VALIDATE] = function () {
  // Check required values have been provided
  assert_set("type", __BC_INSTANTIATION_TYPE, this);

  // Make sure type dereferences correctly
  // TODO
};
