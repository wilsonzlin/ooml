let exec_instantiation = (bc_inst, namespace) => {
  let type = resolve_parent_ld_class_reference(bc_inst[__BC_INSTANTIATION_TYPE], null, namespace);

  let inst = construct_ooml_instance(type, bc_inst[__BC_INSTANTIATION_INITIALSTATE]);

  document.body.appendChild(inst[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT]);
};
