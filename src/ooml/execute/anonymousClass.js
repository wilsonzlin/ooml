ooml.execute.anonymousClass = klass => {
  if (klass instanceof ClassBuilder) {
    klass = klass[__IP_BUILDER_PROTO_COMPILE]();
  }
  // exec_group will check that no other anonymous class
  // already exists with the same name
  exec_class(klass);
};
