let create_instantiation = config => {
  let builder = new InstantiationBuilder();

  builder.setType(config.type);

  if (u_has_own_property(config, "initialState")) {
    builder.setInitialState(config.initialState);
  }

  return builder;
};
