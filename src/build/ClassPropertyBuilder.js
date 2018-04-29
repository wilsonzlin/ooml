let ClassPropertyBuilder = function () {
  this[__IP_BUILDER_LINKED_METHODS] = new StringSet();

  this[__BC_CLASSPROP_DISPATCHHANDLERS] = u_new_clean_object();
};

let ClassPropertyBuilderPrototype = ClassPropertyBuilder.prototype = u_new_clean_object();

ClassPropertyBuilderPrototype.setName = function (name) {
  this[__BC_CLASSPROP_NAME] = assert_valid_r("name", name, valid_property_or_method_name);
};

ClassPropertyBuilderPrototype.setType = function (type) {
  this[__BC_CLASSPROP_TYPE] = assert_valid_r("type", type, valid_ooml_type);
};

ClassPropertyBuilderPrototype.isArray = function (array) {
  this[__BC_CLASSPROP_ARRAY] = assert_typeof_r("array", array, TYPEOF_BOOLEAN);
};

ClassPropertyBuilderPrototype.setDefaultValue = function (default_value) {
  this[__BC_CLASSPROP_DEFAULTVALUE] = assert_not_undefined_r("default value", default_value);
};

ClassPropertyBuilderPrototype.isTransient = function (transient) {
  this[__BC_CLASSPROP_TRANSIENT] = assert_typeof_r("transient", transient, TYPEOF_BOOLEAN);
};

ClassPropertyBuilderPrototype.setPassthrough = function (passthrough) {
  this[__BC_CLASSPROP_PASSTHROUGH] = assert_valid_r("passthrough", passthrough, valid_property_or_method_name);
};

ClassPropertyBuilderPrototype.setGet = function (get) {
  this[__IP_BUILDER_LINKED_METHODS].add(
    this[__BC_CLASSPROP_GET] = assert_valid_prop_or_method_reference_p_r("get", get)
  );
};

ClassPropertyBuilderPrototype.setSet = function (set) {
  this[__IP_BUILDER_LINKED_METHODS].add(
    this[__BC_CLASSPROP_SET] = assert_valid_prop_or_method_reference_p_r("set", set)
  );
};

ClassPropertyBuilderPrototype.setChange = function (change) {
  this[__IP_BUILDER_LINKED_METHODS].add(
    this[__BC_CLASSPROP_CHANGE] = assert_valid_prop_or_method_reference_p_r("change", change)
  );
};

ClassPropertyBuilderPrototype.setBinding = function (binding) {
  // TODO
  this[__BC_CLASSPROP_BINDING] = binding;
};

ClassPropertyBuilderPrototype.setBindingExist = function (binding_exist) {
  this[__IP_BUILDER_LINKED_METHODS].add(
    this[__BC_CLASSPROP_BINDINGEXIST] = assert_valid_prop_or_method_reference_p_r("bindingExist", binding_exist)
  );
};

ClassPropertyBuilderPrototype.setBindingMissing = function (binding_missing) {
  this[__IP_BUILDER_LINKED_METHODS].add(
    this[__BC_CLASSPROP_BINDINGMISSING] = assert_valid_prop_or_method_reference_p_r("bindingMissing", binding_missing)
  );
};

ClassPropertyBuilderPrototype.addDispatchHandler = function (dispatch_event, method) {
  dispatch_event = assert_valid_r("dispatch event name", dispatch_event, valid_dispatch_event_name)
    .toLocaleLowerCase();
  method = assert_valid_prop_or_method_reference_p_r("method", method);

  if (this[__BC_CLASSPROP_DISPATCHHANDLERS][dispatch_event]) {
    throw ReferenceError(`A handler already exists for dispatch event "${dispatch_event}"`);
  }

  this[__IP_BUILDER_LINKED_METHODS].add(method);

  this[__BC_CLASSPROP_DISPATCHHANDLERS][dispatch_event] = method;
};

ClassPropertyBuilderPrototype[__IP_BUILDER_PROTO_COMPILE] = function (bc_mod, bc_ns, bc_class, ancestor_contexts) {
  // Check required values have been provided
  assert_set("name", __BC_CLASSPROP_NAME, this);

  let name = this[__BC_CLASSPROP_NAME];
  // TYPEOF_STRING || "group.mod.ns.c" || undefined
  let declared_type_raw = this[__BC_CLASSPROP_TYPE];

  // These variables will be updated with inherited value if this property overrides
  let actual_type_is_class = declared_type_raw && !__primitive_types_s.has(declared_type_raw);
  let actual_type = declared_type_raw; // TYPEOF_STRING || class SomeClass {} || undefined
  if (actual_type_is_class) {
    // This property has a class type
    actual_type = resolve_prop_type_bc_class_reference(declared_type_raw, bc_mod, bc_ns, this);
  }
  let array = this[__BC_CLASSPROP_ARRAY];
  let transient = this[__BC_CLASSPROP_TRANSIENT];
  let has_own_default_value = u_has_own_property(this, __BC_CLASSPROP_DEFAULTVALUE);
  let binding = this[__BC_CLASSPROP_BINDING];

  let own_default_value = this[__BC_CLASSPROP_DEFAULTVALUE];
  let own_passthrough = this[__BC_CLASSPROP_PASSTHROUGH];
  let own_binding_missing = this[__BC_CLASSPROP_BINDINGMISSING];
  let own_binding_exist = this[__BC_CLASSPROP_BINDINGEXIST];

  // It is this builder's responsibility to check inheritance,
  // as too many property validations depend on it

  // Find root property this property overrides from, if applicable
  let root_prop = undefined;
  ancestor_contexts.some(ancestor_ctx => root_prop = find_bc_prop_from_class(ancestor_ctx[2], name));

  if (!root_prop) {
    // This property does not override any property

    // If it seems some checks are missing, check further down and at bottom

    if (own_passthrough) {
      // Passthrough does not have to point to instance property
      if (!actual_type_is_class) {
        // Also blocks passthroughs on transient properties, as they can't have a class type
        throw SyntaxError(`Passthrough set on non-instance property`);
      }

      if (actual_type != ooml.Instance) {
        if (actual_type == bc_class && own_passthrough == name) {
          // Can't passthrough to own class and property
          throw ReferenceError(`Cyclic passthrough`);
        }

        if (!find_bc_prop_from_class(actual_type, name)) {
          // TODO Check inherited properties as well
          throw ReferenceError(`Non-existent passthrough property`);
        }
      }
    }

    if (transient) {
      // Transient properties cannot have a class type; this allows other checks to
      // automatically work with transient property rules
      if (actual_type_is_class) {
        throw SyntaxError(`Transient property has type`);
      }
    }

    if (array) {
      // Array property
      if (!actual_type_is_class) {
        // Also blocks transient properties, as they can't have a class type
        throw TypeError(`Array property doesn't have ooml class type`);
      }
    }

  } else {
    // Root property exists, so this property overrides
    // Make sure override rules are adhered to

    // Check type is convariant last

    // `array` and `transient` can be declared when overriding an
    // array/transient property, but it is redundant
    // Type guaranteed to be compatible because it must be covariant
    if (!root_prop[__BC_CLASSPROP_ARRAY] && array) {
      throw SyntaxError(`Array property overrides non-array property`);
    }
    array = root_prop[__BC_CLASSPROP_ARRAY];

    if (!root_prop[__BC_CLASSPROP_TRANSIENT] && transient) {
      throw SyntaxError(`Transient property overrides non-transient property`);
    }
    transient = root_prop[__BC_CLASSPROP_TRANSIENT];

    // Can't have binding on overriding property
    // (bindings are always set on root property, and cannot be overridden)
    // However binding handlers can still be added
    if (binding) {
      throw SyntaxError(`Binding can't be declared on an overriding property`);
    }
    binding = root_prop[__BC_CLASSPROP_BINDING];

    // Don't need to check inherited passthrough as type must be covariant
    if (own_passthrough) {
      throw SyntaxError(`Passthrough can't be declared on an overriding property`);
    }

    // Inherited default value doesn't need to be checked

    // Ensure convariant type

    // Find last property in the root property override chain with a type declaration
    // (may exist even if $root_prop has no type declaration,
    //  may be == $root_prop,
    //  and may be undefined)
    let last_prop_with_type_type;
    let last_prop_with_type_type_raw = undefined;
    let last_prop_with_type_ctx = ancestor_contexts.slice().reverse().find(ancestor_ctx => {
      let prop = find_bc_prop_from_class(ancestor_ctx[2], name);
      if (prop) {
        return last_prop_with_type_type_raw = prop[__BC_CLASSPROP_TYPE];
      }
    });

    // Resolve last property's type
    if (!last_prop_with_type_type_raw) {
      // $last_prop_with_type has no type declaration,
      // which means $root_prop has no type declaration,
      // which means $root_prop has the default type or no type if transient

    } else {
      if (u_typeof(last_prop_with_type_type_raw, TYPEOF_STRING)) {
        // Last property has a class type
        last_prop_with_type_type = resolve_prop_type_bc_class_reference(last_prop_with_type_type_raw,
          last_prop_with_type_ctx[0], last_prop_with_type_ctx[1], last_prop_with_type_ctx[2]);
      } else {
        // Last property has a primitive type
        last_prop_with_type_type = last_prop_with_type_type_raw;
      }
    }

    // Compare last property's type to this property's type
    if (!declared_type_raw) {
      // This property overrides but has no type declaration,
      // so it inherits the last property's type
      actual_type = last_prop_with_type_type;
      // $actual_type could be undefined
      actual_type_is_class = valid_ooml_class(last_prop_with_type_type);

    } else {
      // This property overrides and has a type declaration,
      // so make sure type is covariant
      if (!valid_covariant_ooml_type(last_prop_with_type_type, actual_type)) {
        throw TypeError(`Overriding property's type is not covariant`);
      }
    }
  }

  if ((this[__BC_CLASSPROP_GET] || this[__BC_CLASSPROP_SET]) && array) {
    // Transient properties can have getters/setters/change listeners
    // Array and instance properties can have change listeners
    throw SyntaxError(`Getter or setter on array property`);
  }

  if (this[__BC_CLASSPROP_DISPATCHHANDLERS].length && !actual_type_is_class) {
    // Also blocks handlers on transient properties, as they can't have a type
    throw SyntaxError(`Handler set on primitive property`);
  }

  // Overriding properties can't have bindings,
  // but can still have binding handlers
  if (binding) {
    // Transient properties can have binding
    if (actual_type_is_class) {
      throw SyntaxError(`Array or instance property has binding`);
    }
  } else {
    if (own_binding_exist || own_binding_missing) {
      throw SyntaxError(`Binding handler on property with no binding`);
    }
  }

  // Check default value
  if (has_own_default_value) {
    if (array) {
      // Array property's default value must be null or array JSON
      if (own_default_value !== null && !valid_json_array(own_default_value)) {
        throw TypeError(`Array property doesn't have JSON array default value`);
      }

    } else if (actual_type_is_class) {
      // Instance property's default value must be null or object JSON
      if (own_default_value !== null && !valid_json_object(own_default_value)) {
        throw TypeError(`Instance property doesn't have JSON object default value`);
      }

    } else {
      // Transient or primitive property
      if (actual_type) {
        // Property has type declaration
        if (!u_is_a_type(own_default_value, actual_type)) {
          throw TypeError(`Primitive property doesn't match declared type`);
        }
      }
    }
  }

  // Need to compile to make a copy, even with identical data
  return generate_bc_from_builder(this);
};
