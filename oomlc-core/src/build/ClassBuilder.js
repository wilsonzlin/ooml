let ClassBuilder = function () {
  this[__IP_BUILDER_MEMBER_NAMES] = new StringSet();
  this[__IP_BUILDER_FIELD_NAMES] = new StringSet();

  this[__BC_CLASS_PROPERTIES] = [];
  this[__BC_CLASS_METHODS] = [];
  this[__BC_CLASS_STATICUNITS] = [];
};

let ClassBuilderPrototype = ClassBuilder.prototype = u_new_clean_object();

ClassBuilderPrototype.setFQN = function (fqn) {
  this[__BC_CLASS_FQN] = assert_valid_r("FQN", fqn, valid_class_reference);
};

ClassBuilderPrototype.setParent = function (class_reference) {
  this[__BC_CLASS_PARENT] = assert_valid_r("parent", class_reference, valid_class_reference);
};

ClassBuilderPrototype.setConstructor = function (raw_fn) {
  this[__BC_CLASS_CONSTRUCTOR] = assert_typeof_r("constructor", raw_fn, TYPEOF_STRING);
};

ClassBuilderPrototype.isAbstract = function (abstract) {
  this[__BC_CLASS_ABSTRACT] = assert_typeof_r("abstract", abstract, TYPEOF_BOOLEAN);
};

ClassBuilderPrototype.addProperty = function (property) {
  assert_instanceof_r("property", property, ClassPropertyBuilder);

  property[__IP_BUILDER_PROTO_VALIDATE]();

  assert_unique_in_stringset_s_r("property or method", property[__BC_CLASSPROP_NAME], this[__IP_BUILDER_MEMBER_NAMES]);

  this[__BC_CLASS_PROPERTIES].push(property);
};

ClassBuilderPrototype.addMethod = function (method) {
  assert_instanceof_r("method", method, ClassMethodBuilder);

  method[__IP_BUILDER_PROTO_VALIDATE]();

  assert_unique_in_stringset_s_r("property or method", method[__BC_CLASSMETHOD_NAME], this[__IP_BUILDER_MEMBER_NAMES]);

  this[__BC_CLASS_METHODS].push(method);
};

ClassBuilderPrototype.addField = function (field) {
  assert_instanceof_r("field", field, ClassFieldBuilder);

  field[__IP_BUILDER_PROTO_VALIDATE]();

  assert_unique_in_stringset_s_r("field", field[__BC_CLASSFIELD_NAME], this[__IP_BUILDER_FIELD_NAMES]);

  let unit = u_new_clean_object();
  unit[__BC_CLASSSTATICUNIT_TYPE] = __BC_CLASSSTATICUNIT_TYPE_ENUMVAL_INITIALISER;
  unit[__BC_CLASSSTATICUNIT_VALUE] = field;

  this[__BC_CLASS_STATICUNITS].push(unit);
};

ClassBuilderPrototype.addInitialiser = function (raw_fn) {
  let unit = u_new_clean_object();
  unit[__BC_CLASSSTATICUNIT_TYPE] = __BC_CLASSSTATICUNIT_TYPE_ENUMVAL_INITIALISER;
  unit[__BC_CLASSSTATICUNIT_VALUE] = assert_typeof_r("initialiser", raw_fn, TYPEOF_STRING);

  this[__BC_CLASS_STATICUNITS].push(unit);
};

ClassBuilderPrototype.setView = function (view) {
  assert_instanceof_r("field", view, ClassViewBuilder);

  view[__IP_BUILDER_PROTO_VALIDATE]();

  this[__BC_CLASS_VIEW] = view;
};

ClassBuilderPrototype[__IP_BUILDER_PROTO_VALIDATE] = function () {
  // Check required values have been provided
  assert_set("FQN", __BC_CLASS_FQN, this);

  // NOTE: A lot of ancestor traversals in this builder are done every time
  //       and not cached/collapsed because they are context dependent
  //       and builders need to be independent and reusable

  let ancestors = [];
  if (this[__BC_CLASS_PARENT]) {
    // Cyclic inheritance not possible
    let bc_class = this;
    while (bc_class[__BC_CLASS_PARENT]) {
      let ancestor = resolve_class_reference(bc_class[__BC_CLASS_PARENT], bc_class[__BC_CLASS_FQN]);
      ancestors.unshift(ancestor);
    }
  }

  u_iterate(this[__BC_CLASS_PROPERTIES], prop => {
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

  let view = this[__BC_CLASS_VIEW];

  if (view) {
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
  }
};
