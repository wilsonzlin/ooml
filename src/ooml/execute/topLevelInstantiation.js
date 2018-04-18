ooml.execute.topLevelInstantiation = inst => {
  if (inst instanceof InstantiationBuilder) {
    inst = inst[__IP_BUILDER_PROTO_COMPILE]();
  }
  exec_instantiation(inst);
};
