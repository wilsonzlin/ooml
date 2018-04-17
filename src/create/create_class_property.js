let create_class_property = config => {
  config = u_validate_object(config, {
    name: {
      validator: valid_property_or_method_name,
    },
    type: {
      optional: true,
      validator: valid_ooml_type,
      // Don't set default value:
      //   - Save bytecode space
      //   - Transient properties can't have types
    },
    array: {
      optional: true,
      type: TYPEOF_BOOLEAN,
    },
    defaultValue: {
      optional: true,
      validator: valid_non_undefined_value,
    },
    transient: {
      optional: true,
      type: TYPEOF_BOOLEAN,
    },
    // Keep order of properties as they are checked in order after
    passthrough: {
      optional: true,
      validator: valid_property_or_method_name,
    },
    get: {
      optional: true,
      validator: valid_property_or_method_reference,
    },
    set: {
      optional: true,
      validator: valid_property_or_method_reference,
    },
    change: {
      optional: true,
      validator: valid_property_or_method_reference,
    },
    binding: {
      optional: true,
      // TODO
    },
    bindingExist: {
      optional: true,
      validator: valid_property_or_method_reference,
    },
    bindingMissing: {
      optional: true,
      validator: valid_property_or_method_reference,
    },
    handlers: {
      optional: true,
      glob: __regex_handle_attr_name_glob,
      validator: valid_property_or_method_reference,
    },
  });


};
