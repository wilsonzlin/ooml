let construct_ooml_instance = (klass, init_state_source) => {
  if (init_state_source instanceof klass) {
    return init_state_source;
  }

  return new klass(init_state_source);
};
