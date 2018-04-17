ooml.execute.module = mod => {
  if (mod instanceof ModuleBuilder) {
    mod = mod[__IP_BUILDER_PROTO_COMPILE]();
  }
  // exec_group will check that group does not already have
  // loaded module with the same name
  exec_module(mod);
};
