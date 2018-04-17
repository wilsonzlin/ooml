let parse_dom_group = $group => {
  let config = validate_dom_attrs($group, {
    ooml: {
      skip: true,
    },
    name: {
      validator: valid_group_name,
    },
  });
  config.modules = {};

  u_iterate($group.children, $child => {
    let type = $child.getAttribute("ooml");

    if (type != "module") {
      throw SyntaxError(`Invalid ooml tag type "${type}"`);
    }

    let module;
    try {
      module = parse_dom_module($child);
    } catch (e) {
      e.message += `\n    in group "${config.name}"`;
      throw e;
    }

    if (config.modules[module.name]) {
      throw ReferenceError(`Duplicate module "${module.name}"`);
    }
    config.modules[module.name] = module;
  });

  return config;
};
