let exec_class = (bc_class, module, namespace) => {
  let class_name = bc_class[__BC_CLASS_NAME];
  let class_parent_ref = bc_class[__BC_CLASS_PARENT];
  let class_abstract = bc_class[__BC_CLASS_ABSTRACT]; // TODO
  let class_initialisers = bc_class[__BC_CLASS_INITIALISERS];

  let bc_class_properties = bc_class[__BC_CLASS_PROPERTIES];
  let bc_class_methods = bc_class[__BC_CLASS_METHODS];
  let bc_class_fields = bc_class[__BC_CLASS_FIELDS];
  let bc_class_view = bc_class[__BC_CLASS_VIEW];

  if (!namespace) {
    if (__rt_bc_anon_classes[class_name]) {
      throw ReferenceError(`Anonymous class "${class_name}" already exists`);
    }
  }

  let class_parent = class_parent_ref ?
    resolve_parent_ld_class_reference(class_parent_ref, module, namespace) :
    ooml.Instance;

  // Reasons to collapse properties:
  //   - faster performance (less traversal, compact data)
  //   - finding property attributes without traversing ancestors every time
  //   - easier coding
  let collapsed_properties = class_parent[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES] ?
    u_deep_clone(class_parent[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES]) :
    u_new_clean_object();

  // Cache collapsed names for constructor
  let collapsed_property_names = class_parent[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTY_NAMES] ?
    u_deep_clone(class_parent[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTY_NAMES]).slice() :
    [];

  // $collapsed_properties and $collapsed_property_names will be updated after $ooml_class,
  // as $collapsed_properties needs to refer to $ooml_class

  let ooml_class = function (init_state_source) {
    let _this = this;

    if (Object.getPrototypeOf(_this) != ooml_class.prototype) {
      throw SyntaxError(`ooml class constructor applied on different type of instance`);
    }

    ooml.EventSource.call(_this);

    // Unserialise (if necessary) initial state
    init_state_source = unserialise_init_state_source(ooml_class, init_state_source);

    // Set up internal properties
    let properties_state = u_new_clean_object();

    u_iterate(collapsed_property_names, prop_name => {
      let prop_state = u_new_clean_object();

      // Don't need to use set as even attributes with multiple substitutions to the same property
      // are only added once as their map's keys are used
      // Instance/array substitutions will have their only node at index 0
      // If a property is not substituted (inc. array/inst props), this will be empty
      prop_state[__IP_OOML_PROPERTIES_STATE_NODES] = [];

      // TODO

      properties_state[prop_name] = prop_state;
    });

    // Set up $properties_state before calling this
    // This will define exposed DOM element properties on $_this
    let dom_elem = exec_view_node(bc_class_view[__BC_CLASSVIEW_ROOT],
      _this,
      properties_state);

    let _this_properties_values = u_new_clean_object();
    _this_properties_values[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT] = dom_elem;
    _this_properties_values[__IP_OOML_INST_OWN_PROPERTIES_STATE] = properties_state;

    // Apply own internal properties
    u_enumerate(_this_properties_values, (val, p) => {
      Object.defineProperty(_this, p, {value: val});
    });

    // Prevent assigning to non-existent properties
    Object.preventExtensions(_this);

    // Assign values from initial state or default values
    u_enumerate(collapsed_properties, (bc_prop, prop_name) => {
      let has_default_value = u_has_own_property(bc_prop, __BC_CLASSPROP_DEFAULTVALUE);
      let default_value = bc_prop[__BC_CLASSPROP_DEFAULTVALUE];

      if (init_state_source && u_has_own_property(init_state_source, prop_name)) {
        let passthrough_property = bc_prop[__BC_CLASSPROP_PASSTHROUGH];

        if (passthrough_property) {
          // If passthrough, initialise instance with initial state built-in
          // (to prevent it counting as a change, and to increase efficiency)
          let expanded = u_assign({}, default_value);
          expanded[passthrough_property] = init_state_source[prop_name];
          // Default value could be null or undefined
          _this[prop_name] = expanded;

        } else {
          // Otherwise, just use provided value
          _this[prop_name] = init_state_source[prop_name];
        }

      } else {
        if (has_default_value) {
          // Don't need to clone, as it won't be modified
          _this[prop_name] = default_value;
        } else {
          // Neither this property nor any ancestor has a default value,
          // and no value is provided by $init_state_source
          _this[prop_name] = get_default_value_for_type(bc_prop[__BC_CLASSPROP_TYPE]);
        }
      }
    });

    // Call post-constructor
    // noinspection JSUnresolvedVariable
    if (_this.postConstructor) {
      _this.postConstructor();
    }

    // TODO
  };

  u_enumerate(bc_class_properties, (bc_prop, prop_name) => {
    let root = !collapsed_properties[prop_name];

    if (root) {
      collapsed_property_names.push(prop_name);
      collapsed_properties[prop_name] = u_new_clean_object();
    }

    // Do not need to collapse property name and binding,
    // as they don't need to be shared across descendants

    let prop = collapsed_properties[prop_name];

    if (root) {
      // Need an array because overrides can use their own,
      // and all need to be called
      prop[__BC_CLASSPROP_CHANGE] = [];
      prop[__BC_CLASSPROP_BINDINGEXIST] = [];
      prop[__BC_CLASSPROP_BINDINGMISSING] = [];
      prop[__BC_CLASSPROP_DISPATCHHANDLERS] = u_new_clean_object();

      // These are only set by root and can't be changed by overrides
      prop[__BC_CLASSPROP_ARRAY] = bc_prop[__BC_CLASSPROP_ARRAY];
      prop[__BC_CLASSPROP_TRANSIENT] = bc_prop[__BC_CLASSPROP_TRANSIENT];
      prop[__BC_CLASSPROP_PASSTHROUGH] = bc_prop[__BC_CLASSPROP_PASSTHROUGH];
    }

    if (bc_prop[__BC_CLASSPROP_TYPE]) {
      if (u_typeof(bc_prop[__BC_CLASSPROP_TYPE], TYPEOF_STRING)) {
        prop[__BC_CLASSPROP_TYPE] = resolve_property_ld_class_reference(
          bc_prop[__BC_CLASSPROP_TYPE],
          module,
          namespace,
          ooml_class);

      } else {
        prop[__BC_CLASSPROP_TYPE] = bc_prop[__BC_CLASSPROP_TYPE];
      }
    }

    if (u_has_own_property(bc_prop, __BC_CLASSPROP_DEFAULTVALUE)) {
      prop[__BC_CLASSPROP_DEFAULTVALUE] = bc_prop[__BC_CLASSPROP_DEFAULTVALUE];
    }

    if (bc_prop[__BC_CLASSPROP_GET]) {
      prop[__BC_CLASSPROP_GET] = bc_prop[__BC_CLASSPROP_GET];
    }

    if (bc_prop[__BC_CLASSPROP_SET]) {
      prop[__BC_CLASSPROP_SET] = bc_prop[__BC_CLASSPROP_SET];
    }

    if (bc_prop[__BC_CLASSPROP_CHANGE]) {
      prop[__BC_CLASSPROP_CHANGE].push(bc_prop[__BC_CLASSPROP_CHANGE]);
    }

    if (bc_prop[__BC_CLASSPROP_BINDINGEXIST]) {
      prop[__BC_CLASSPROP_BINDINGEXIST].push(bc_prop[__BC_CLASSPROP_BINDINGEXIST]);
    }

    if (bc_prop[__BC_CLASSPROP_BINDINGMISSING]) {
      prop[__BC_CLASSPROP_BINDINGMISSING].push(bc_prop[__BC_CLASSPROP_BINDINGMISSING]);
    }

    if (bc_prop[__BC_CLASSPROP_DISPATCHHANDLERS]) {
      u_enumerate(bc_prop[__BC_CLASSPROP_DISPATCHHANDLERS], (method_name, dispatch_event) => {
        if (!prop[__BC_CLASSPROP_DISPATCHHANDLERS][dispatch_event]) {
          prop[__BC_CLASSPROP_DISPATCHHANDLERS][dispatch_event] = [];
        }
        prop[__BC_CLASSPROP_DISPATCHHANDLERS][dispatch_event].push(method_name);
      });
    }
  });

  let ooml_class_prototype = Object.create(class_parent.prototype);

  // Static properties for internal use
  let ooml_class_properties_values = u_new_clean_object();
  ooml_class_properties_values.name = class_name;
  ooml_class_properties_values.namespace = namespace;
  ooml_class_properties_values.module = module;
  ooml_class_properties_values.prototype = ooml_class_prototype;
  ooml_class_properties_values[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTY_NAMES] = collapsed_property_names;
  ooml_class_properties_values[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES] = collapsed_properties;

  // Apply class internal static properties
  u_enumerate(ooml_class_properties_values, (val, p) => {
    Object.defineProperty(ooml_class, p, {value: val});
  });

  // Apply class fields
  u_enumerate(bc_class_fields, (bc_field, field_name) => {
    // Don't need to bind `this` to field if function, as JS does automatically
    Object.defineProperty(ooml_class, field_name, {
      value: bc_field[__BC_CLASSFIELD_VALUE], // Don't need to clone, as there is only one use
      writable: true,
      enumerable: true,
    });
  });

  let ooml_class_prototype_properties_config = u_new_clean_object();

  ooml_class_prototype_properties_config.constructor = {value: ooml_class};
  // WARNING: $namespace and $module not frozen
  ooml_class_prototype_properties_config.namespace = {value: namespace};
  ooml_class_prototype_properties_config.module = {value: module};

  u_enumerate(collapsed_properties, (prop, prop_name) => {
    if (ooml_class.prototype[prop_name]) {
      // This property is overriding
      return;
    }

    let internal_setter_property = prop[__BC_CLASSPROP_ARRAY] ?
      __IP_OOML_INST_PROTO_SET_ARRAY_PROPERTY : // Array property
      u_typeof(prop[__BC_CLASSPROP_TYPE], TYPEOF_FUNCTION) ?
        __IP_OOML_INST_PROTO_SET_INSTANCE_PROPERTY : // Instance property
        __IP_OOML_INST_PROTO_SET_PRIMITIVE_OR_TRANSIENT_PROPERTY; // Primitive or transient property

    ooml_class_prototype_properties_config[prop_name] = {
      get: function () {
        return this[__IP_OOML_INST_PROTO_GET_PROPERTY](prop_name);
      },
      set: function (value) {
        if (value === undefined) {
          throw TypeError(`Undefined provided as property value`);
        }
        this[internal_setter_property](prop_name, value);
      },
      // Don't make enumerable, as this is on prototype, so not enumerable anyway
    };
  });

  // Set defined methods on class prototype
  u_enumerate(bc_class_methods, (bc_method, method_name) => {
    ooml_class_prototype_properties_config[method_name] = {value: bc_method[__BC_CLASSMETHOD_FUNCTION]};
  });

  // Apply class prototype properties
  Object.defineProperties(ooml_class_prototype, ooml_class_prototype_properties_config);

  // Call initialisers
  if (class_initialisers) {
    u_iterate(class_initialisers, init => {
      init.call(ooml_class);
    });
  }

  if (!namespace) {
    __rt_bc_anon_classes[class_name] = bc_class;
    __rt_ld_anon_classes[class_name] = ooml_class;

  } else {
    // For when called by exec_namespace
    return ooml_class;
  }
};
