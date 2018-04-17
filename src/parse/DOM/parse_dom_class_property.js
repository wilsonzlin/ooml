let parse_dom_class_property = $prop => {
  let config = collect_dom_attrs($prop, {
    ooml: {
      skip: true,
    },
    name: {},
    type: {},
    array: {
      boolean: true,
    },
    transient: {
      boolean: true,
    },
    passthrough: {},
    get: {},
    set: {},
    change: {},
    binding: {},
    bindingExist: {},
    bindingMissing: {},
    handlers: {
      glob: /^handle-(.+)$/,
    },
  });
  let default_value = eval_dom_js($prop);
  if (default_value !== undefined) {
    config.default_value = default_value;
  }

  return config;
};
