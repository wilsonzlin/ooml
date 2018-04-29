let exec_instantiation = (bc_inst, namespace) => {
  let type = resolve_parent_ld_class_reference(bc_inst[__BC_INSTANTIATION_TYPE], null, namespace);

  let inst = construct_ooml_instance(type, bc_inst[__BC_INSTANTIATION_INITIALSTATE]);

  __rt_dom_update_add_to_queue(inst[__IP_OOML_INST_OWN_DOM_ELEMENT], __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_APPENDTO, document.body);
};
