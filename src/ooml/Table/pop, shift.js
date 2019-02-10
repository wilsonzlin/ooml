u_iterate(["pop", "shift"], method_name => {
  oomlTableMutationPrototype[method_name] = function () {
    let arr = this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];

    let inst_to_detach = arr[method_name]();
    if (inst_to_detach) {
      inst_to_detach[__IP_OOML_EVENTSOURCE_PROTO_ERASE_ATTACHMENT_CONFIG]();
    }

    return inst_to_detach;
  };
});
