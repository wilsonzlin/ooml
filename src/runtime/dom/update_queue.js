let __rt_dom_update_queue = [];

let __rt_dom_update_async_scheduler = window.requestAnimationFrame ||
                                      window.webkitRequestAnimationFrame ||
                                      window.mozRequestAnimationFrame ||
                                      window.msRequestAnimationFrame ||
                                      ((callback) => setTimeout(callback, 15));

let __rt_dom_update_scheduled;

let __rt_dom_update_process_queue = () => {
  // Need to have separate for Array as otherwise
  // reinsert might not work due to anchors removed later in queue
  let arrays_to_unload = [];

  u_iterate(__rt_dom_update_queue, current => {
    let arr;

    let tree_action = current[__IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION];
    if (tree_action) {
      let tree_arg = current[__IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ARGUMENT];
      // Using `delete` will cause error if doesn't exist
      // Need to erase otherwise won't be added to queue next time
      current[__IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION] = undefined;
      current[__IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ARGUMENT] = undefined;

      switch (tree_action) {
      case __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_APPENDTO:
        tree_arg.appendChild(current);
        break;

      case __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_INSERTAFTER:
        tree_arg.parentNode.insertBefore(current, tree_arg.nextSibling);
        break;

      case __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_POTENTIALLYREMOVE:
        if (current.parentNode) {
          current.parentNode.removeChild(current);
        }
        break;

      case __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_ARRREINSERT:
        arrays_to_unload.push(current);
        break;

      case __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_ARRUNLOAD:
        arr = current[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];
        u_iterate(arr, inst => {
          let elem = inst[__IP_OOML_INST_OWN_DOM_ELEMENT];
          if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
          }
        });
        break;
      }
    }

    let cdata_action = current[__IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION];
    if (cdata_action) {
      let cdata_arg = current[__IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ARGUMENT];
      current[__IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION] = undefined;
      current[__IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ARGUMENT] = undefined;

      switch (cdata_action) {
      case __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ENUMVAL_UPDATETEXT:
        current.data = cdata_arg;
        break;

      case __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ENUMVAL_APPLYATTR:
        current[__IP_OOML_EMUL_ATTR_OWNER].setAttribute(
          current[__IP_OOML_EMUL_ATTR_NAME],
          current[__IP_OOML_EMUL_ATTR_VALUEPARTS].join(""));
        break;
      }
    }
  });

  u_iterate(arrays_to_unload, current => {
    let arr = current[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];

    let last_elem_dom = current[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR];

    u_iterate(arr, elem => {
      last_elem_dom.parentNode.insertBefore(elem[__IP_OOML_INST_OWN_DOM_ELEMENT], last_elem_dom.nextSibling);
      last_elem_dom = elem[__IP_OOML_INST_OWN_DOM_ELEMENT];
    });
  });

  __rt_dom_update_queue = [];

  __rt_dom_update_scheduled = false;
};

let __rt_dom_update_add_to_queue = (unit, action, argument) => {
  if (!unit[__IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION]) {
    __rt_dom_update_queue.push(unit);
  }

  unit[
    action == __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ENUMVAL_UPDATETEXT ||
    action == __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ENUMVAL_APPLYATTR ?
      __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION :
      __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION
    ] = action;
  unit[
    action == __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ENUMVAL_UPDATETEXT ||
    action == __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ENUMVAL_APPLYATTR ?
      __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ARGUMENT :
      __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ARGUMENT
    ] = argument;

  if (!__rt_dom_update_scheduled) {
    __rt_dom_update_scheduled = true;

    __rt_dom_update_async_scheduler(__rt_dom_update_process_queue);
  }
};
