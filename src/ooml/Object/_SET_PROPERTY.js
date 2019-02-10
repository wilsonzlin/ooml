oomlObjectPrototype[__IP_OOML_OBJ_PROTO_SET_PROPERTY] = function (prop_name, new_value) {
  if (new_value === undefined) {
    throw TypeError(`Undefined provided as property value`);
  }

  let _this = this;

  let state = _this[__IP_OOML_OBJ_OWN_PROPERTIES_STATE][prop_name];
  let config = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES][prop_name];

  let old_value = state[__IP_OOML_PROPERTIES_STATE_CURRENTVALUE];

  let custom_dom;
  let remove_custom_dom;
  let is_initial = old_value === undefined;

  if (config[__BC_CLASSPROP_SET]) {
    let setter_rv = _this[config[__BC_CLASSPROP_SET]](new_value, old_value, is_initial, prop_name);
    if (setter_rv === false) {
      return;
    }

    if (setter_rv && u_typeof(setter_rv, TYPEOF_OBJECT)) {
      if (setter_rv.value != undefined) {
        new_value = setter_rv.value;
      }

      if (u_typeof(setter_rv.HTML, TYPEOF_STRING)) {
        let custom_html = setter_rv.HTML;
        if (!custom_html) {
          remove_custom_dom = true;
        } else {
          let dom = document.createElement("div");
          dom.innerHTML = custom_html;
          if (dom.children.length != 1) {
            throw SyntaxError(`Custom HTML has no or multiple root elements`);
          }
          custom_dom = dom.children[0];
        }
      }
    }
  }

  // Because initially $old_value is undefined and $new_value cannot be undefined,
  // this runs initially as well
  if (old_value !== new_value) {
    if (remove_custom_dom || custom_dom) {
      // Remove any old custom HTML if blank or new custom HTML provided
      if (state[__IP_OOML_PROPERTIES_STATE_CUSTOMHTMLDOMELEMS]) {
        u_iterate(state[__IP_OOML_PROPERTIES_STATE_CUSTOMHTMLDOMELEMS], $custom_dom_elem => {
          if ($custom_dom_elem[__IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION]) {
            // Old custom HTML still in queue
            $custom_dom_elem[__IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION] = undefined;
          } else {
            // Old custom HTML needs to be removed from DOM
            __rt_dom_update_add_to_queue($custom_dom_elem, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_POTENTIALLYREMOVE);
          }
        });
      }
      // Reset custom HTML DOM elements array
      state[__IP_OOML_PROPERTIES_STATE_CUSTOMHTMLDOMELEMS] = [];
    }

    // Write changes only if value changed
    u_iterate(state[__IP_OOML_PROPERTIES_STATE_NODES], node => {
      if (node instanceof Text) {
        let new_text;

        if (custom_dom) {
          let cloned = custom_dom.cloneNode(true);
          state[__IP_OOML_PROPERTIES_STATE_CUSTOMHTMLDOMELEMS].push(cloned);

          __rt_dom_update_add_to_queue(cloned, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_INSERTAFTER, node);

          new_text = "";

        } else {
          new_text = new_value;
        }

        __rt_dom_update_add_to_queue(node, __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ENUMVAL_UPDATETEXT, new_text);

      } else {
        // Must be attribute
        u_iterate(node[__IP_OOML_EMUL_ATTR_VALUESUBMAP][prop_name], index => {
          node[__IP_OOML_EMUL_ATTR_VALUEPARTS][index] = new_value;
        });

        __rt_dom_update_add_to_queue(node, __IP_OOML_RUNTIME_DOM_UPDATE_CDATA_ACTION_ENUMVAL_APPLYATTR);
      }
    });

    state[__IP_OOML_PROPERTIES_STATE_CURRENTVALUE] = new_value;

    // This should run initially as well (rebinding is really just binding)
    let dependent_bindings = config[__IP_OOML_PROPERTIES_CONFIG_DEPENDENT_BINDINGS] &&
                             config[__IP_OOML_PROPERTIES_CONFIG_DEPENDENT_BINDINGS][prop_name];
    if (dependent_bindings) {
      u_iterate(dependent_bindings, dependent => {
        config[dependent][__BC_CLASSPROP_BINDINGSUBMAP][prop_name].forEach(idx => {
          state[dependent][__IP_OOML_PROPERTIES_STATE_BINDINGPARTS][idx] = new_value;
        });
        _this[__IP_OOML_OBJ_PROTO_REBIND_BINDING](dependent);
      });
    }

    u_iterate(config[__BC_CLASSPROP_CHANGE], method_name => {
      _this[method_name](old_value, is_initial);
    });

    _this[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_CHANGE]("update", {
      property: prop_name,
      oldValue: old_value,
      newValue: new_value,
      isInitial: is_initial,
    });
  }
};
