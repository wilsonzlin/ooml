let create_module = config => {
  let builder = new ModuleBuilder();

  builder.setName(config.name);

  if (u_has_own_property(config, "group")) {
    builder.setGroup(config.group);
  }

  assert_valid_r("namespaces", config.namespaces, valid_object_literal);
  u_enumerate(config.namespaces, namespace => {
    builder.addNamespace(create_namespace(namespace));
  });

  return builder;
};
