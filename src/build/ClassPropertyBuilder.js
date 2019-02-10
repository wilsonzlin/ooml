let ClassPropertyBuilder = function () {
  this[__IP_BUILDER_LINKED_PROPERTIES] = new StringSet();
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

ClassPropertyBuilderPrototype.setDefaultValue = function (raw_default_value) {
  this[__BC_CLASSPROP_DEFAULTVALUE] = assert_typeof_r("default value", raw_default_value, TYPEOF_STRING);
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
  binding = binding.trim();

  if (!binding) {
    throw SyntaxError(`Empty binding`);
  }

  let parts = [];
  let map = u_new_clean_object();

  let is_dynamic = false;

  stream_substitution_parts(binding, lit => {
    parts.push(lit);

  }, sub_prop => {
    this[__IP_BUILDER_LINKED_PROPERTIES].add(
      sub_prop = assert_valid_prop_or_method_reference_p_r("binding dynamic part", sub_prop)
    );

    let part_id = parts.push(undefined) - 1;
    if (!map[sub_prop]) {
      map[sub_prop] = [];
    }
    map[sub_prop].push(part_id);

    is_dynamic = true;
  });

  this[__BC_CLASSPROP_BINDING] = parts;
  if (is_dynamic) {
    this[__BC_CLASSPROP_BINDINGSUBMAP] = map;
  }
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

ClassPropertyBuilderPrototype[__IP_BUILDER_PROTO_VALIDATE] = function () {
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
          throw ReferenceError(`Passthrough to own class and property`);
        }

        // Don't check if references actual value:
        // - Could still be cyclic (e.g. A.b -> B.c -> A.b)
        // - Target property may not accept same values
        // - Target property may be inherited (so all ancestors need to be checked)
      }
    }

  } else {
    // Root property exists, so this property overrides
    // Make sure override rules are adhered to

    // Check type is invariant last

    // `transient` can be declared when overriding a transient property, but it is redundant
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

    // Don't need to check inherited passthrough as type must be invariant
    if (own_passthrough) {
      throw SyntaxError(`Passthrough can't be declared on an overriding property`);
    }
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

  // Don't check default value
};
