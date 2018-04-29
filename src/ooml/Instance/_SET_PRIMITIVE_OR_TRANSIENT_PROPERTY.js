oomlInstancePrototype[__IP_OOML_INST_PROTO_SET_PRIMITIVE_OR_TRANSIENT_PROPERTY] = function (prop_name, new_value) {
  // $new_value is assumed to be not undefined
  let _this = this;

  let state = _this[__IP_OOML_INST_OWN_PROPERTIES_STATE][prop_name];
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
        // TODO Allow false, HTMLElement
        // noinspection JSUnresolvedVariable
        let custom_html = setter_rv.HTML.trim();
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

  if (config[__BC_CLASSPROP_TYPE]) {
    if (!u_typeof(new_value, config[__BC_CLASSPROP_TYPE])) {
      throw TypeError(`Value must be of type ${ config[__BC_CLASSPROP_TYPE] }`);
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
    /* TODO
    let dependentBindings = instance.constructor[OOML_CLASS_PROPNAME_PROPERTIES_TO_DEPENDENT_BINDINGS][prop_name];
    if (dependentBindings) {
      dependentBindings.forEach(dependentProperty => {
        classProperties[dependentProperty].bindingPropertyToPartMap[prop_name].forEach(idx => {
          instanceProperties[dependentProperty].bindingParts[idx] = new_value;
        });
        instance[OOML_INSTANCE_PROPNAME_REBIND_BINDING](dependentProperty);
      });
    }
    */

    u_iterate(config[__BC_CLASSPROP_CHANGE], method_name => {
      _this[method_name](new_value, is_initial);
    });

    _this[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_CHANGE]("u  pdate", {
      property: prop_name,
      oldValue: old_value,
      newValue: new_value,
      initial: is_initial,
    });
  }
};
