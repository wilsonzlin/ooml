let create_class_property = config => {
  let builder = new ClassPropertyBuilder();

  builder.setName(config.name);

  if (u_has_own_property(config, "type")) {
    builder.setType(config.type);
  }

  if (u_has_own_property(config, "array")) {
    builder.isArray(config.array);
  }

  if (u_has_own_property(config, "defaultValue")) {
    builder.setDefaultValue(config.defaultValue);
  }

  if (u_has_own_property(config, "transient")) {
    builder.isTransient(config.transient);
  }

  if (u_has_own_property(config, "passthrough")) {
    builder.setPassthrough(config.passthrough);
  }

  if (u_has_own_property(config, "get")) {
    builder.setGet(config.get);
  }

  if (u_has_own_property(config, "set")) {
    builder.setSet(config.set);
  }

  if (u_has_own_property(config, "change")) {
    builder.setChange(config.change);
  }

  if (u_has_own_property(config, "binding")) {
    builder.setBinding(config.binding);
  }

  if (u_has_own_property(config, "bindingExist")) {
    builder.setBindingExist(config.bindingExist);
  }

  if (u_has_own_property(config, "bindingMissing")) {
    builder.setBindingMissing(config.bindingMissing);
  }

  if (u_has_own_property(config, "dispatchHandlers")) {
    assert_valid_r("dispatchHandlers", config.dispatchHandlers, valid_object_literal);
    u_enumerate(config.dispatchHandlers, (method_name, event_name) => {
      builder.addDispatchHandler(event_name, method_name);
    });
  }

  return builder;
};
