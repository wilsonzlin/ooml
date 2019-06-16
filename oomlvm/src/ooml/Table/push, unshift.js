u_iterate(["push", "unshift"], method_name => {
  oomlTableMutationPrototype[method_name] = function (new_value) {
    if (new_value === undefined) {
      throw TypeError(`Attempted to add undefined into OOML.Array`);
    }

    let _this = this;
    let arr = _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];

    let new_inst = construct_ooml_instance(_this[__IP_OOML_ARRAY_OWN_ELEMENT_TYPE], new_value);

    let insert_after;

    // Only attach to DOM if array is attached to DOM
    if (_this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR]) {
      insert_after = method_name == "push" && arr.length ?
        arr[arr.length - 1][__IP_OOML_INST_OWN_DOM_ELEMENT] :
        _this[__IP_OOML_ARRAY_OWN_PARENT_ANCHOR];
    }

    // Don't provide index as property, as element could move around
    new_inst[__IP_OOML_EVENTSOURCE_PROTO_ATTACH](_this, undefined, insert_after);

    return arr[method_name](new_inst);
  };
});
