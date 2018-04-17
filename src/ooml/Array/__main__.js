ooml.Array = function (element_type, initial_elems) {
  let _this = this;

  assert_valid_r("element type", element_type, valid_ooml_class);
  if (initial_elems != undefined) {
    assert_valid_r("initial elements", initial_elems, valid_array);
  }

  ooml.EventSource.call(_this);

  // Use Text instead of Comment to prevent
  // empty comments from littering the DOM
  let dom_element = document.createTextNode("");

  // When this array is detached, the DOM elements of instances in this array
  // need to be parked somewhere with a parent
  // (most removal methods require a parent)
  let parking_parent = document.createElement("div");
  parking_parent.appendChild(dom_element);

  let internal_arr;

  if (initial_elems) {
    internal_arr = initial_elems.map(elem => construct_ooml_instance(element_type, elem));
    internal_arr.reduce((prev_elem_dom, elem_to_attach) => {
      elem_to_attach[__IP_OOML_EVENTSOURCE_PROTO_ATTACH](_this, undefined, prev_elem_dom);
      return elem_to_attach[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT];
    }, dom_element);

  } else {
    internal_arr = [];
  }

  // Use defineProperty for properties to prevent enumeration
  let _this_properties_config = u_new_clean_object();
  _this_properties_config[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY] = {
    value: internal_arr,
  };
  _this_properties_config[__IP_OOML_ARRAY_OWN_ELEMENT_TYPE] = {
    value: element_type,
  };

  _this_properties_config[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT] = {
    value: dom_element,
  };
  _this_properties_config[__IP_OOML_ARRAY_OWN_PARKING_PARENT] = {
    value: parking_parent,
  };

  u_enumerate(_this_properties_config, (config, prop_name) => {
    Object.defineProperty(_this, prop_name, config);
  });

  Object.preventExtensions(_this);
};

let oomlArrayPrototype = ooml.Array.prototype = Object.create(ooml.EventSource.prototype);
let oomlArrayMutationPrototype = u_new_clean_object();
