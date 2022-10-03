let parse_dom_class_field = $field => {
  let config = collect_dom_attrs($field, {
    name: {},
  });

  let default_value_js = $field.textContent.trim();

  if (default_value_js) {
    config.value = u_eval_js(default_value_js);
  }

  return config;
};
