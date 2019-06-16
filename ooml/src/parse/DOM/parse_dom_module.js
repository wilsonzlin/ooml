let parse_dom_module = $module => {
  let config = collect_dom_attrs($module, {
    ooml: {
      skip: true,
    },
    name: {},
    group: {},
  });
  config.namespaces = [];

  u_iterate(get_dom_child_elements($module), $child => {
    let type = $child.getAttribute("ooml");

    if (type != "namespace") {
      throw SyntaxError(`Invalid ooml tag type "${type}"`);
    }

    let namespace = parse_dom_namespace($child, false);

    config.namespaces.push(namespace);
  });

  return config;
};
