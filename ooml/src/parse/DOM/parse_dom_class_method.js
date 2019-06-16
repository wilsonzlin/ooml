let parse_dom_class_method = $method => {
  let config = collect_dom_attrs($method, {
    name: {},
  });

  let default_value_js = $method.textContent.trim();

  if (default_value_js) {
    config.function = u_eval_js(default_value_js);
  }

  return config;
};
