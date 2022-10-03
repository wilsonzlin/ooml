let parse_dom_instantiation = $inst => {
  let config = collect_dom_attrs($inst, {
    ooml: {
      skip: true,
    },
    type: {},
  });

  let default_value_js = $inst.textContent.trim();

  if (default_value_js) {
    config.initialState = u_eval_js(default_value_js);
  }

  return config;
};
