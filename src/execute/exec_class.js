let exec_class = (bc_class) => {
  let class_fqn = bc_class[__BC_CLASS_FQN];
  let class_fqn_components = class_fqn.split(".");
  let class_name = class_fqn_components[class_fqn_components.length - 1];
  let class_parent_ref = bc_class[__BC_CLASS_PARENT];
  let class_abstract = bc_class[__BC_CLASS_ABSTRACT];

  let class_constructor = bc_class[__BC_CLASS_CONSTRUCTOR];

  let class_static_units = bc_class[__BC_CLASS_STATICUNITS];

  let bc_class_properties = bc_class[__BC_CLASS_PROPERTIES];
  let bc_class_methods = bc_class[__BC_CLASS_METHODS];
  let bc_class_view = bc_class[__BC_CLASS_VIEW];

  if (__rt_ld_classes[class_fqn]) {
    throw ReferenceError(`Class "${class_fqn}" already exists`);
  }

  let class_parent = class_parent_ref ?
    __rt_ld_classes[class_parent_ref] :
    ooml.Object;

  // Reasons to collapse properties:
  //   - faster performance (less traversal, compact data)
  //   - finding property attributes without traversing ancestors every time
  //   - easier coding
  let collapsed_properties = class_parent[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES] ?
    u_deep_clone(class_parent[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES]) :
    u_new_clean_object();

  // Cache collapsed names for constructor
  let collapsed_property_names = class_parent[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTY_NAMES] ?
    class_parent[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTY_NAMES].slice() :
    [];

  // $collapsed_properties and $collapsed_property_names will be updated after $ooml_class,
  // as $collapsed_properties needs to refer to $ooml_class

  let ooml_class;
  if (class_abstract) {
    ooml_class = function () {
      throw TypeError(`Abstract classes can't be instantiated`);
    };

  } else {
    ooml_class = function () {
      // TODO Move all of this to dedicated builder function so both .from and normal constructor calling work
      let _this = this;

      if (Object.getPrototypeOf(_this) != ooml_class.prototype) {
        throw SyntaxError(`ooml class constructor applied on different type of instance`);
      }

      let constructor_args = [];
      for (let i = 0; i < arguments.length; i++) {
        constructor_args.push(arguments[i]);
      }

      build_ooml_instance(_this, ooml_class, undefined, constructor_args);
    };
  }

  let properties_to_dependent_bindings = u_new_clean_object(); // { "id": ["name"] } i.e. <p name="name" binding="{{ this.id }}"></p>

  // Set up collapsed properties config and names
  u_enumerate(bc_class_properties, (bc_prop, prop_name) => {
    let is_root = !collapsed_properties[prop_name];

    if (is_root) {
      collapsed_property_names.push(prop_name);
      collapsed_properties[prop_name] = u_new_clean_object();
    }

    // Do not need to collapse property name and binding,
    // as they don't need to be shared across descendants

    let prop = collapsed_properties[prop_name];

    if (is_root) {
      // Need an array because overrides can use their own,
      // and all need to be called
      prop[__BC_CLASSPROP_CHANGE] = [];
      prop[__BC_CLASSPROP_BINDINGEXIST] = [];
      prop[__BC_CLASSPROP_BINDINGMISSING] = [];
      prop[__BC_CLASSPROP_DISPATCHHANDLERS] = u_new_clean_object();

      // These are only set by root and can't be changed by overrides
      prop[__BC_CLASSPROP_TYPE] = bc_prop[__BC_CLASSPROP_TYPE];
      prop[__BC_CLASSPROP_TRANSIENT] = bc_prop[__BC_CLASSPROP_TRANSIENT];
      prop[__BC_CLASSPROP_PASSTHROUGH] = bc_prop[__BC_CLASSPROP_PASSTHROUGH];
      prop[__BC_CLASSPROP_BINDING] = bc_prop[__BC_CLASSPROP_BINDING];
      if (bc_prop[__BC_CLASSPROP_BINDINGSUBMAP]) {
        prop[__BC_CLASSPROP_BINDINGSUBMAP] = bc_prop[__BC_CLASSPROP_BINDINGSUBMAP];
        // Don't add to dependency[__IP_OOML_PROPERTIES_CONFIG_DEPENDENT_BINDINGS] because it might not exist yet
        u_enumerate(bc_prop[__BC_CLASSPROP_BINDINGSUBMAP], (_, dependency) => {
          if (!properties_to_dependent_bindings[dependency]) {
            properties_to_dependent_bindings[dependency] = [];
          }
          properties_to_dependent_bindings[dependency].push(prop_name);
        });
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

  u_enumerate(properties_to_dependent_bindings, (dependents, dependency) => {
    collapsed_properties[dependency][__IP_OOML_PROPERTIES_CONFIG_DEPENDENT_BINDINGS] = dependents;
  });

  let class_view = exec_view_node(bc_class_view[__BC_CLASSVIEW_ROOT], collapsed_properties);

  let ooml_class_prototype = Object.create(class_parent.prototype);

  let o_container = class_fqn_components.length > 1 ? traverse_o(class_fqn_components.slice(0, -1)) : undefined;
  let o_module = o[class_fqn_components[0]];

  // Attach class to `o`, filling any gaps, before evaluating code and providing aliases to container
  fill_o(class_fqn_components, ooml_class);

  // JS VM runtime class properties
  u_define_data_property(ooml_class, "name", class_name);
  u_define_data_property(ooml_class, "prototype", ooml_class_prototype);
  u_define_data_property(ooml_class_prototype, "constructor", ooml_class);

  // Static properties for internal use
  u_define_data_property(ooml_class, __IP_OOML_CLASS_OWN_COLLAPSED_PROPERTY_NAMES, collapsed_property_names);
  u_define_data_property(ooml_class, __IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES, collapsed_properties);
  u_define_data_property(ooml_class, __IP_OOML_CLASS_OWN_VIEW, class_view);

  // Helpful relative traversal properties on class
  u_define_data_property(ooml_class, "container", o_container);
  u_define_data_property(ooml_class, "module", o_module);

  // Helpful relative traversal properties on instances
  u_define_data_property(ooml_class_prototype, "container", o_container);
  u_define_data_property(ooml_class_prototype, "module", o_module);

  u_enumerate(collapsed_properties, (prop, prop_name) => {
    if (ooml_class.prototype[prop_name]) {
      // This property is overriding
      return;
    }

    u_define_property(ooml_class_prototype, prop_name, {
      get: function () {
        return this[__IP_OOML_OBJ_PROTO_GET_PROPERTY](prop_name);
      },
      set: function (value) {
        this[__IP_OOML_OBJ_PROTO_SET_PROPERTY](prop_name, value);
      },
      // Don't make enumerable, as this is on prototype, so not enumerable anyway
    });
  });

  // Set defined methods on class prototype
  u_enumerate(bc_class_methods, (bc_method, method_name) => {
    u_define_property(ooml_class_prototype, method_name, eval_and_return_with_ooml(bc_method[__BC_CLASSMETHOD_FUNCTION]));
  });

  // Set constructor as special method on class prototype
  if (class_constructor) {
    u_define_property(ooml_class_prototype, __IP_OOML_CLASS_PROTO_CONSTRUCTOR, class_constructor);
  }

  // Set up static units
  if (class_static_units) {
    u_iterate(class_static_units, u => {
      let u_value = u[__BC_CLASSSTATICUNIT_VALUE];

      switch (u[__BC_CLASSSTATICUNIT_TYPE]) {
      case __BC_CLASSSTATICUNIT_TYPE_ENUMVAL_FIELD:
        // Set up field
        // Don't need to bind `this` to field if regular function, as JS does automatically
        // Provide class as `this` if it's a value or arrow function
        u_define_property(ooml_class, u_value[__BC_CLASSFIELD_NAME], {
          value: eval_and_return_with_ooml(u_value[__BC_CLASSFIELD_VALUE], ooml_class),
          writable: true,
          enumerable: true,
        });
        break;

      case __BC_CLASSSTATICUNIT_TYPE_ENUMVAL_INITIALISER:
        // Call initialiser
        eval_with_ooml(u_value, ooml_class);
        break;
      }
    });
  }

  __rt_bc_classes[class_fqn] = bc_class;
};
