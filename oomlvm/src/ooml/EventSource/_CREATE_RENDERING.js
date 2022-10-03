oomlEventSourcePrototype[__IP_OOML_EVENTSOURCE_PROTO_CREATE_RENDERING] = function () {
  let _this = this;

  let renderings = _this[__IP_OOML_OBJ_OWN_RENDERINGS];

  let new_rendering_id = renderings.length;

  let dom_elem = class_view[__IP_OOML_VIEW_TEMPLATE_ROOT].cloneNode(true);

  // Set up exposed DOM elements
  u_iterate(class_view[__IP_OOML_VIEW_EXPOSED_ELEMS], expose => {
    let key = expose[0];
    let path = expose[1];

    u_define_data_property(_this, key, traverse_dom_path(dom_elem, path));
  });

  // Set up DOM event handlers
  u_iterate(class_view[__IP_OOML_VIEW_ELEMS_WITH_EVENT_HANDLERS], elem_with_handler => {
    let event_name = elem_with_handler[0];
    let method_name = elem_with_handler[1];
    let path = elem_with_handler[2];

    traverse_dom_path(dom_elem, path).addEventListener(event_name, event => {
      _this[method_name](event);
    });
  });

  // Set up substitutions
  u_iterate(class_view[__IP_OOML_VIEW_SUBSTITUTIONS], sub => {
    let prop_name = sub[0];
    let path = sub[1];

    properties_state[prop_name][__IP_OOML_PROPERTIES_STATE_NODES].push(traverse_dom_path(dom_elem, path));
  });

  // Set up attributes with substitutions
  u_iterate(class_view[__IP_OOML_VIEW_ATTRS_WITH_SUBSTITUTIONS], attr_config => {
    let attr_name = attr_config[0];
    let value_parts = attr_config[1];
    let value_sub_map = attr_config[2];
    let mapped_to_props = attr_config[3];
    let path = attr_config[4];

    // COMPATIBILITY - IE: Don't use .(get|set)Attribute(Node)? -- buggy behaviour in IE
    // This is an emulated Node instance
    let attr = u_new_clean_object();
    attr[__IP_OOML_EMUL_ATTR_NAME] = attr_name;
    attr[__IP_OOML_EMUL_ATTR_VALUEPARTS] = value_parts.slice();
    attr[__IP_OOML_EMUL_ATTR_VALUESUBMAP] = value_sub_map;
    attr[__IP_OOML_EMUL_ATTR_OWNER] = traverse_dom_path(dom_elem, path);

    u_iterate(mapped_to_props, prop_name => {
      properties_state[prop_name][__IP_OOML_PROPERTIES_STATE_NODES].push(attr);
    });
  });
};
