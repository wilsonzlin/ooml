let ClassBuilder = function () {
  this[__IP_BUILDER_MEMBER_NAMES] = new StringSet();
  this[__IP_BUILDER_FIELD_NAMES] = new StringSet();
  this[__IP_BUILDER_UNCHECKED_PROPERTIES] = u_new_clean_object();
  this[__IP_BUILDER_UNCHECKED_METHODS] = u_new_clean_object();
  this[__IP_BUILDER_UNCHECKED_FIELDS] = u_new_clean_object();

  this[__BC_CLASS_STATICUNITS] = [];
};

let ClassBuilderPrototype = ClassBuilder.prototype = u_new_clean_object();

ClassBuilderPrototype.setFQN = function (fqn) {
  this[__BC_CLASS_FQN] = assert_valid_r("FQN", fqn, valid_class_reference);
};

ClassBuilderPrototype.setParent = function (class_reference) {
  this[__BC_CLASS_PARENT] = assert_valid_r("parent", class_reference, valid_class_reference);
};

ClassBuilderPrototype.setConstructor = function (fn) {
  this[__BC_CLASS_CONSTRUCTOR] = assert_typeof_r("constructor", fn, TYPEOF_FUNCTION);
};

ClassBuilderPrototype.isAbstract = function (abstract) {
  this[__BC_CLASS_ABSTRACT] = assert_typeof_r("abstract", abstract, TYPEOF_BOOLEAN);
};

ClassBuilderPrototype.addProperty = function (property) {
  assert_instanceof_r("property", property, ClassPropertyBuilder);

  this[__IP_BUILDER_UNCHECKED_PROPERTIES][
    assert_unique_in_stringset_s_r("property or method", property[__BC_CLASSPROP_NAME], this[__IP_BUILDER_MEMBER_NAMES])
    ] = property;
};

ClassBuilderPrototype.addMethod = function (method) {
  assert_instanceof_r("method", method, ClassMethodBuilder);

  this[__IP_BUILDER_UNCHECKED_METHODS][
    assert_unique_in_stringset_s_r("property or method", method[__BC_CLASSMETHOD_NAME], this[__IP_BUILDER_MEMBER_NAMES])
    ] = method;
};

ClassBuilderPrototype.addField = function (field) {
  assert_instanceof_r("field", field, ClassFieldBuilder);

  let name = field[__BC_CLASSFIELD_NAME];
  assert_unique_in_stringset_s_r("field", name, this[__IP_BUILDER_FIELD_NAMES]);

  let unit = {};
  unit[__BC_CLASSSTATICUNIT_TYPE] = __BC_CLASSSTATICUNIT_TYPE_ENUMVAL_INITIALISER;
  unit[__BC_CLASSSTATICUNIT_VALUE] = field[__IP_BUILDER_PROTO_COMPILE]();

  this[__BC_CLASS_STATICUNITS].push(unit);
};

ClassBuilderPrototype.addInitialiser = function (fn) {
  let unit = {};
  unit[__BC_CLASSSTATICUNIT_TYPE] = __BC_CLASSSTATICUNIT_TYPE_ENUMVAL_INITIALISER;
  unit[__BC_CLASSSTATICUNIT_VALUE] = assert_typeof_r("initialiser", fn, TYPEOF_FUNCTION);
  this[__BC_CLASS_STATICUNITS].push(unit);
};

ClassBuilderPrototype.setView = function (view) {
  assert_instanceof_r("field", view, ClassViewBuilder);

  this[__IP_BUILDER_UNCHECKED_VIEW] = view;
};

ClassBuilderPrototype[__IP_BUILDER_PROTO_COMPILE] = function (bc_mod) {
  // Check required values have been provided
  // TODO
  // assert_set("name", __BC_CLASS_NAME, this);

  // NOTE: A lot of ancestor traversals in this builder are done every time
  //       and not cached/collapsed because they are context dependent
  //       and builders need to be independent and reusable

  let ancestor_contexts = [];
  if (this[__BC_CLASS_PARENT]) {
    // Cyclic inheritance not possible, except if parent == "this"
    if (this[__BC_CLASS_PARENT] == "this") {
      throw ReferenceError(`Parent is itself`);
    }
    let bc_class = this;
    while (bc_class[__BC_CLASS_PARENT]) {
      let context = resolve_bc_class_reference(bc_class[__BC_CLASS_PARENT], bc_mod, bc_ns, bc_class);
      bc_mod = context[0];
      bc_ns = context[1];
      bc_class = context[2];
      ancestor_contexts.unshift(context);
    }
  }

  let bc = generate_bc_from_builder(this);

  // Validate fields
  // TODO
  // bc[__BC_CLASS_FIELDS] = u_new_clean_object();
  // u_enumerate(this[__IP_BUILDER_UNCHECKED_FIELDS], (field, field_name) => {
  //   bc[__BC_CLASS_FIELDS][field_name] = field[__IP_BUILDER_PROTO_COMPILE](bc_mod, bc_ns, this);
  // });

  // Validate methods before properties and view,
  // as they can link to methods
  bc[__BC_CLASS_METHODS] = u_new_clean_object();
  u_enumerate(this[__IP_BUILDER_UNCHECKED_METHODS], (method, method_name) => {
    bc[__BC_CLASS_METHODS][method_name] = method[__IP_BUILDER_PROTO_COMPILE](bc_mod, bc_ns, this);
  });

  bc[__BC_CLASS_PROPERTIES] = u_new_clean_object();
  u_enumerate(this[__IP_BUILDER_UNCHECKED_PROPERTIES], (prop, prop_name) => {
    // Make sure property is valid first before validing relation to class
    // Don't put into $bc until validated
    let bc_prop = prop[__IP_BUILDER_PROTO_COMPILE](bc_mod, bc_ns, this, ancestor_contexts);

    // Check linked properties from property
    // __IP_BUILDER_LINKED_PROPERTIES is a Set so don't use u_iterate
    prop[__IP_BUILDER_LINKED_PROPERTIES].forEach(prop_name => {
      if (!ancestor_contexts.some(ac => find_bc_prop_from_class(ac[2], prop_name)) &&
          !bc[__BC_CLASS_PROPERTIES][prop_name]) {
        throw ReferenceError(`Non-existent property reference "this.${prop_name}"`);
      }
    });

    // Check linked methods from property
    // __IP_BUILDER_LINKED_METHODS is a Set so don't use u_iterate
    prop[__IP_BUILDER_LINKED_METHODS].forEach(method_name => {
      if (!ancestor_contexts.some(ac => find_bc_method_from_class(ac[2], method_name)) &&
          !bc[__BC_CLASS_METHODS][method_name]) {
        throw ReferenceError(`Non-existent method reference "this.${method_name}"`);
      }
    });

    bc[__BC_CLASS_PROPERTIES][prop_name] = bc_prop;
  });

  let view = this[__IP_BUILDER_UNCHECKED_VIEW];

  if (!view) {
    if (!this[__BC_CLASS_ABSTRACT]) {
      // Non-abstract classes must have a view
      throw SyntaxError("Non-abstract class has no view");
    }

  } else {
    let bc_view = view[__IP_BUILDER_PROTO_COMPILE]();

    // Check linked methods from view
    // __IP_BUILDER_DOM_EVENT_HANDLER_METHODS is a Set so don't use u_iterate
    view[__IP_BUILDER_DOM_EVENT_HANDLER_METHODS].forEach(method_name => {
      if (!ancestor_contexts.some(ac => find_bc_method_from_class(ac[2], method_name)) &&
          !bc[__BC_CLASS_METHODS][method_name]) {
        throw ReferenceError(`Non-existent method reference "this.${method_name}"`);
      }
    });

    // Check substitutions in view
    u_enumerate(view[__IP_BUILDER_SUBSTITUTION_COUNTS], (count, prop_name) => {
      let root_prop;
      if (!ancestor_contexts.some(ac => root_prop = find_bc_prop_from_class(ac[2], prop_name))) {
        root_prop = bc[__BC_CLASS_PROPERTIES][prop_name];
      }

      if (!root_prop) {
        throw ReferenceError(`Non-existent property reference "this.${prop_name}"`);
      }

      if (count > 1 &&
          u_typeof(root_prop[__BC_CLASSPROP_TYPE], TYPEOF_STRING)) {
        throw ReferenceError(`Array or instance property "${prop_name}" is substituted more than once`);
      }
    });

    bc[__BC_CLASS_VIEW] = bc_view;
  }

  return bc;
}
