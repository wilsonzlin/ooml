let parse_dom_class_property = $prop => {
  let config = collect_dom_attrs($prop, {
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
    dispatchHandlers: {
      glob: /^handle(.+)$/,
    },
  });

  let default_value_js = $prop.textContent.trim();

  if (default_value_js) {
    config.defaultValue = u_eval_js(default_value_js);
  }

  return config;
};
