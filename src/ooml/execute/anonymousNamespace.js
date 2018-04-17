ooml.execute.anonymousNamespace = ns => {
  if (ns instanceof NamespaceBuilder) {
    if (ns[__BC_NS_NAME]) {
      throw SyntaxError(`Not an anonymous namespace`);
    }
    ns = ns[__IP_BUILDER_PROTO_COMPILE]();
  }
  exec_namespace(ns, true);
};
