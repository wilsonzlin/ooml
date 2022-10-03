let exec_instantiation = bc_inst => {
  let type = __rt_ld_classes[bc_inst[__BC_INSTANTIATION_TYPE]];

  let inst = construct_ooml_instance(type, bc_inst[__BC_INSTANTIATION_INITIALSTATE]);

  __rt_dom_update_add_to_queue(inst[__IP_OOML_INST_OWN_DOM_ELEMENT], __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_APPENDTO, document.body);
};
