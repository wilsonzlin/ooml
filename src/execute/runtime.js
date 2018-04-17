let __rt_ld_groups = u_new_clean_object();
let __rt_ld_modules = u_new_clean_object();
let __rt_ld_anon_classes = u_new_clean_object();

let __rt_bc_groups = u_new_clean_object();
let __rt_bc_modules = u_new_clean_object();
let __rt_bc_anon_classes = u_new_clean_object();

let __rt_updated_nodes = new NodeSet();
// Optimise by waiting before writing changes in case
// same nodes are updated multiple times
let __rt_write_changes_delay = 50;
let __rt_write_changes_SetTimeout;
let __rt_write_changes = () => {
  if (!__rt_updated_nodes.size) {
    return;
  }

  clearTimeout(__rt_write_changes_SetTimeout);

  __rt_write_changes_SetTimeout = setTimeout(() => {
    // Don't use u_iterate as it's a Set
    __rt_updated_nodes.forEach(attr => {
      attr[__IP_OOML_EMUL_ATTR_OWNER].setAttribute(
        attr[__IP_OOML_EMUL_ATTR_NAME],
        attr[__IP_OOML_EMUL_ATTR_VALUEPARTS].join(""));
    });

    __rt_updated_nodes.clear();
  }, __rt_write_changes_delay);
};
