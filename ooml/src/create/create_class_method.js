let create_class_method = config => {
  let builder = new ClassMethodBuilder();

  builder.setName(config.name);

  builder.setFunction(config.function);

  return builder;
};
