let NamespaceBuilder = function () {
  this[__IP_BUILDER_CLASS_NAMES] = new StringSet();
  this[__IP_BUILDER_UNCHECKED_CLASSES] = [];
  this[__IP_BUILDER_UNCHECKED_INSTANTIATIONS] = [];
};

let NamespaceBuilderPrototype = NamespaceBuilder.prototype = u_new_clean_object();

NamespaceBuilderPrototype.setName = function (name) {
  this[__BC_NS_NAME] = assert_valid_r("name", name, valid_namespace_name);
};

NamespaceBuilderPrototype.addClass = function (klass) {
  assert_instanceof_r("class", klass, ClassBuilder);
  assert_unique_in_stringset_s_r("class", klass[__BC_CLASS_NAME], this[__IP_BUILDER_CLASS_NAMES]);

  this[__IP_BUILDER_UNCHECKED_CLASSES].push(klass);
};

NamespaceBuilderPrototype.addInstantiation = function (instantiation) {
  assert_instanceof_r("instantiation", instantiation, InstantiationBuilder);

  this[__IP_BUILDER_UNCHECKED_INSTANTIATIONS].push(instantiation);
};

NamespaceBuilderPrototype[__IP_BUILDER_PROTO_COMPILE] = function (bc_mod) {
  // Name does not have to be set

  let bc = generate_bc_from_builder(this);

  bc[__BC_NS_CLASSES] = [];
  u_iterate(this[__IP_BUILDER_UNCHECKED_CLASSES], klass => {
    let bc_class = klass[__IP_BUILDER_PROTO_COMPILE](bc_mod, bc);
    bc[__BC_NS_CLASSES].push(bc_class);
  });

  if (!bc[__BC_NS_CLASSES].length) {
    throw SyntaxError(`No classes`);
  }

  bc[__BC_NS_INSTANTIATIONS] = [];
  u_iterate(this[__IP_BUILDER_UNCHECKED_INSTANTIATIONS], inst => {
    let bc_instantiation = inst[__IP_BUILDER_PROTO_COMPILE](bc_mod, bc);
    bc[__BC_NS_INSTANTIATIONS].push(bc_instantiation);
  });

  return bc;
};
