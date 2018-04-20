// Use sets in case same nodes are updated multiple times
// and for easy deletion

let __rt_dom_update_elems_to_appendto = new NodeSet();

// Need insert after as async DOM updating means
// insertBefore nextSibling may not be accurate
let __rt_dom_update_elems_to_insertafter = new NodeSet();

// Remove these elements **if** they have a parent
// The reason is that it's possible that a remove simply cancelled a queued insert (and so it remains removed)
let __rt_dom_update_elems_to_potentially_remove = new NodeSet();

let __rt_dom_update_arrays_to_reinsert = new NodeSet();
let __rt_dom_update_arrays_to_potentially_unload = new NodeSet();

let __rt_dom_update_text_to_change = new NodeSet();
let __rt_dom_update_attr_to_apply = new NodeSet();

let __rt_dom_update_async_scheduler = window.requestAnimationFrame ||
                                      window.webkitRequestAnimationFrame ||
                                      window.mozRequestAnimationFrame ||
                                      window.msRequestAnimationFrame ||
                                      ((callback) => setTimeout(callback, 15));

let __rt_dom_update_scheduled;

let __rt_dom_update_process_queue = () => {
  u_iterate_set_then_clear(__rt_dom_update_elems_to_appendto, elem => {
    let parent = elem[__IP_OOML_RUNTIME_DOM_UPDATE_ACTION_INSERTAFTERORAPPENDTO];
    delete elem[__IP_OOML_RUNTIME_DOM_UPDATE_ACTION_INSERTAFTERORAPPENDTO];
    parent.appendChild(elem);
  });

  u_iterate_set_then_clear(__rt_dom_update_elems_to_insertafter, elem => {
    let after = elem[__IP_OOML_RUNTIME_DOM_UPDATE_ACTION_INSERTAFTERORAPPENDTO];
    delete elem[__IP_OOML_RUNTIME_DOM_UPDATE_ACTION_INSERTAFTERORAPPENDTO];
    after.parentNode.insertBefore(elem, after.nextSibling);
  });

  u_iterate_set_then_clear(__rt_dom_update_elems_to_potentially_remove, es => {
    if (es.parentNode) {
      es.parentNode.removeChild(es);
    }
  });

  u_iterate_set_then_clear(__rt_dom_update_arrays_to_reinsert, ooml_array => {
    let arr = ooml_array[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];

    let array_dom_element = ooml_array[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR];

    arr.reduce((prev_elem, elem) => {
      prev_elem.parentNode.insertBefore(elem[__IP_OOML_INST_OWN_DOM_ELEMENT], prev_elem.nextSibling);
      return elem[__IP_OOML_INST_OWN_DOM_ELEMENT];
    }, array_dom_element);
  });

  u_iterate_set_then_clear(__rt_dom_update_arrays_to_potentially_unload, ooml_array => {
    let arr = ooml_array[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];
    arr.forEach(inst => {
      let elem = inst[__IP_OOML_INST_OWN_DOM_ELEMENT];
      if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    });
  });

  u_iterate_set_then_clear(__rt_dom_update_text_to_change, text => {
    text.data = text[__IP_OOML_RUNTIME_DOM_UPDATE_ACTION_NEWDATA];
    delete text[__IP_OOML_RUNTIME_DOM_UPDATE_ACTION_NEWDATA];
  });

  u_iterate_set_then_clear(__rt_dom_update_attr_to_apply, attr => {
    attr[__IP_OOML_EMUL_ATTR_OWNER].setAttribute(
      attr[__IP_OOML_EMUL_ATTR_NAME],
      attr[__IP_OOML_EMUL_ATTR_VALUEPARTS].join(""));
  });

  __rt_dom_update_scheduled = false;
};

let __rt_dom_update_add_to_queue = (queue, unit) => {
  queue.add(unit);

  if (!__rt_dom_update_scheduled) {
    __rt_dom_update_scheduled = true;

    __rt_dom_update_async_scheduler(__rt_dom_update_process_queue);
  }

};
