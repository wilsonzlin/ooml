oomlTableMutationPrototype.splice = function (start, delete_count) {
  assert_typeof_r("delete count", delete_count, TYPEOF_NUMBER);

  let _this = this;

  // This differs from normal function, which allows $start to go out of bounds
  let actual_start = _this[__IP_OOML_ARRAY_PROTO_NORMALISE_INDEX]("start", start, true);

  let arr = _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];
  let element_type = _this[__IP_OOML_ARRAY_OWN_ELEMENT_TYPE];

  let to_append = [];
  let args_to_apply = [actual_start, delete_count];

  for (let i = 2; i < arguments.length; i++) {
    let arg = arguments[i];

    if (arg === undefined) {
      throw TypeError(`Attempted to add undefined into OOML.Array`);
    }

    let new_elem = construct_ooml_instance(element_type, arg);
    args_to_apply.push(new_elem);
    to_append.push(new_elem);
  }

  let spliced = Array.prototype.splice.apply(arr, args_to_apply);
  u_iterate(spliced, elem => {
    if (elem) {
      elem[__IP_OOML_EVENTSOURCE_PROTO_ERASE_ATTACHMENT_CONFIG]();
    }
  });

  let last_elem_dom;
  if (_this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR]) {
    last_elem_dom = actual_start ?
      arr[actual_start - 1][__IP_OOML_INST_OWN_DOM_ELEMENT] :
      _this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR];
  }

  u_iterate(to_append, inst_elem => {
    inst_elem[__IP_OOML_EVENTSOURCE_PROTO_ATTACH](_this, undefined, last_elem_dom);
    if (last_elem_dom) {
      last_elem_dom = inst_elem[__IP_OOML_INST_OWN_DOM_ELEMENT];
    }
  });

  return spliced;
};
