let create_namespace = config => {
  let builder = new NamespaceBuilder();

  if (u_has_own_property(config, "name")) {
    builder.setName(config.name);
  }

  assert_valid_r("classes", config.classes, valid_object_literal);
  u_enumerate(config.classes, klass => {
    builder.addClass(create_class(klass));
  });

  if (u_has_own_property(config, "instantiations")) {
    assert_valid_r("instantiations", config.instantiations, valid_array);
    u_enumerate(config.instantiations, inst => {
      builder.addInstantiation(create_instantiation(inst));
    });
  }

  return builder;
};
