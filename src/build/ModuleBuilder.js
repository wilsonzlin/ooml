let ModuleBuilder = function () {
  this[__IP_BUILDER_NAMESPACE_NAMES] = new StringSet();
  this[__IP_BUILDER_UNCHECKED_NAMESPACES] = [];
};

let ModuleBuilderPrototype = ModuleBuilder.prototype = u_new_clean_object();

ModuleBuilderPrototype.setName = function (name) {
  this[__BC_MOD_NAME] = assert_valid_r("name", name, valid_module_name);
};

ModuleBuilderPrototype.setGroup = function (group) {
  this[__BC_MOD_GROUP] = assert_valid_r("group", group, valid_group_name);
};

NamespaceBuilderPrototype.addNamespace = function (namespace) {
  assert_instanceof_r("namespace", namespace, NamespaceBuilder);
  assert_unique_in_stringset_s_r("namespace", namespace[__BC_NS_NAME], this[__IP_BUILDER_NAMESPACE_NAMES]);

  this[__IP_BUILDER_UNCHECKED_NAMESPACES].push(namespace);
};

ModuleBuilderPrototype[__IP_BUILDER_PROTO_COMPILE] = function () {
  // Check required values have been provided
  assert_set("name", __BC_MOD_NAME, this);

  let bc = generate_bc_from_builder(this);

  bc[__BC_MOD_NAMESPACES] = [];
  u_iterate(this[__IP_BUILDER_UNCHECKED_NAMESPACES], namespace => {
    let bc_ns = namespace[__IP_BUILDER_PROTO_COMPILE](bc);
    bc[__BC_MOD_NAMESPACES].push(bc_ns);
  });

  return bc;
};
