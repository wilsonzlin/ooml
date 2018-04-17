oomlInstancePrototype[__IP_OOML_INST_PROTO_SET_PRIMITIVE_OR_TRANSIENT_PROPERTY] = function (prop_name, new_value) {
  // $new_value is assumed to be not undefined
  let _this = this;

  let state = _this[__IP_OOML_INST_OWN_PROPERTIES_STATE][prop_name];
  let config = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES][prop_name];

  let current_value = state[__IP_OOML_PROPERTIES_STATE_CURRENTVALUE];

  let custom_html;
  let is_initial = current_value === undefined;

  if (config[__BC_CLASSPROP_SET]) {
    let setter_rv = _this[config[__BC_CLASSPROP_SET]](new_value, current_value, is_initial, prop_name);
    if (setter_rv === false) {
      return;
    }

    if (setter_rv !== undefined) {
      if (!valid_object_literal(setter_rv)) {
        throw TypeError(`Invalid setter return value`);
      }

      if (u_has_own_property(setter_rv, "value")) {
        new_value = setter_rv.value;
      }

      if (u_has_own_property(setter_rv, "HTML")) {
        // noinspection JSUnresolvedVariable
        custom_html = setter_rv.HTML;
      }
    }
  }

  if (!config[__BC_CLASSPROP_TYPE]) {
    // $new_value is guaranteed not to be undefined
    if (!config[__BC_CLASSPROP_TRANSIENT] && !u_is_a_type(__primitive_types_ooml, new_value)) {
      throw TypeError(`Unrecognised type`);
    }

  } else {
    if (!u_is_a_type(config[__BC_CLASSPROP_TYPE], new_value)) {
      throw TypeError(`Value must be one of: ${ config[__BC_CLASSPROP_TYPE].join(", ") }`);
    }
  }

  // Because initially $current_value is undefined and $new_value cannot be undefined,
  // this runs initially as well
  if (current_value !== new_value) {
    // Write changes only if value changed
    update_dom(prop_name, state[__IP_OOML_PROPERTIES_STATE_NODES], new_value, custom_html);

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
      _this[method_name](current_value, is_initial);
    });

    _this[__IP_OOML_EVENTSOURCE_PROTO_FORWARD_CHANGE]("update", {
      property: prop_name,
      oldValue: current_value,
      newValue: new_value,
      initial: is_initial,
    });
  }
};
