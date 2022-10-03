let parse_dom_namespace = ($namespace, anonymous) => {
  let config = collect_dom_attrs($namespace, {
    ooml: {
      skip: true,
    },
    name: anonymous ? undefined : {},
  });
  config.classes = [];
  config.instantiations = [];

  u_iterate(get_dom_child_elements($namespace), $child => {
    let type = $child.getAttribute("ooml");

    if (type == "inst") {
      config.instantiations.push(parse_dom_instantiation($child));
      return;
    }

    if (type != "class") {
      throw SyntaxError(`Invalid ooml tag type "${type}"`);
    }

    let klass = parse_dom_class($child);

    config.classes.push(klass);
  });

  return config;
};
