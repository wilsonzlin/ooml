ooml.Array = function (element_type, initial_elems) {
  let _this = this;

  assert_valid_r("element type", element_type, valid_ooml_class);
  if (initial_elems != undefined) {
    assert_valid_r("initial elements", initial_elems, valid_array);
  }

  ooml.EventSource.call(_this);

  let internal_arr;

  if (initial_elems) {
    internal_arr = initial_elems.map(elem => {
      let inst = construct_ooml_instance(element_type, elem);
      // Optimisation: Don't attach to array's DOM until array itself is attached
      inst[__IP_OOML_EVENTSOURCE_PROTO_ATTACH](_this);
      return inst;
    });

  } else {
    internal_arr = [];
  }

  // Use defineProperty for properties to prevent enumeration
  u_define_data_property(_this, __IP_OOML_ARRAY_OWN_INTERNAL_ARRAY, internal_arr);
  u_define_data_property(_this, __IP_OOML_ARRAY_OWN_ELEMENT_TYPE, element_type);
  u_define_data_property(_this, __IP_OOML_ARRAY_OWN_PARENT_ANCHOR, undefined, true);
  u_define_data_property(_this, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION, undefined, true);
  u_define_data_property(_this, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ARGUMENT, undefined, true);

  // Prevent arr[0] = "some_value" from working
  Object.preventExtensions(_this);
};

let oomlArrayPrototype = ooml.Array.prototype = Object.create(ooml.EventSource.prototype);
let oomlArrayMutationPrototype = u_new_clean_object();
