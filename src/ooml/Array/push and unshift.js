u_iterate(["push", "unshift"], method_name => {
  oomlArrayMutationPrototype[method_name] = function (new_value) {
    if (new_value === undefined) {
      throw TypeError(`Attempted to add undefined into OOML.Array`);
    }

    let _this = this;
    let arr = _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];

    let insert_after = method_name == "push" && arr.length ?
      arr[arr.length - 1][__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT] :
      _this[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT];

    let new_inst = construct_ooml_instance(_this[__IP_OOML_ARRAY_OWN_ELEMENT_TYPE], new_value);
    // Don't provide index as property, as element could move around
    new_inst[__IP_OOML_EVENTSOURCE_PROTO_ATTACH](_this, undefined, insert_after);

    return arr[method_name](new_inst);
  };
});
