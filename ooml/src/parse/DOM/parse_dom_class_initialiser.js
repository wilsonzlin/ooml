let parse_dom_class_initialiser = $init => {
  let default_value_js = $init.textContent.trim();

  let fn;

  if (default_value_js) {
    fn = u_eval_js(`function() {${default_value_js}}`);
  }

  return fn;
};
