let create_class_field = config => {
  let builder = new ClassFieldBuilder();

  builder.setName(config.name);

  builder.setValue(config.value);

  return builder;
};
