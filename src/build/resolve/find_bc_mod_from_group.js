let find_bc_mod_from_group = (group, mod) => {
  return group &&
         group[__BC_GROUP_MODULES].find(m => m[__BC_MOD_NAME] == mod);
};
