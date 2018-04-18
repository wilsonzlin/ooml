let create_class = config => {
  let builder = new ClassBuilder();

  builder.setName(config.name);

  if (u_has_own_property(config, "parent")) {
    builder.setParent(config.parent);
  }

  if (u_has_own_property(config, "abstract")) {
    builder.isAbstract(config.abstract);
  }

  if (u_has_own_property(config, "properties")) {
    assert_valid_r("properties", config.properties, valid_object_literal);
    u_enumerate(config.properties, prop => {
      builder.addProperty(create_class_property(prop));
    });
  }

  if (u_has_own_property(config, "methods")) {
    assert_valid_r("methods", config.methods, valid_object_literal);
    u_enumerate(config.methods, method => {
      builder.addMethod(create_class_method(method));
    });
  }

  if (u_has_own_property(config, "fields")) {
    assert_valid_r("fields", config.fields, valid_object_literal);
    u_enumerate(config.fields, field => {
      builder.addField(create_class_field(field));
    });
  }

  if (u_has_own_property(config, "initialisers")) {
    assert_valid_r("initialisers", config.initialisers, valid_array);
    u_enumerate(config.initialisers, init => {
      builder.addInitialiser(init);
    });
  }

  if (u_has_own_property(config, "view")) {
    builder.setView(create_class_view(config.view));
  }

  return builder;
};
