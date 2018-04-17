let parse_dom_module = $module => {
  let config = validate_dom_attrs($module, {
    ooml: {
      skip: true,
    },
    name: {
      validator: valid_module_name,
    },
  });
  config.namespaces = {};

  u_iterate($module.children, $child => {
    let type = $child.getAttribute("ooml");

    if (type != "namespace") {
      throw SyntaxError(`Invalid ooml tag type "${type}"`);
    }

    let namespace;
    try {
      namespace = parse_dom_namespace($child, false);
    } catch (e) {
      e.message += `\n    in module "${config.name}"`;
      throw e;
    }

    if (config.namespaces[namespace.name]) {
      throw ReferenceError(`Duplicate namespace "${namespace.name}"`);
    }
    config.namespaces[namespace.name] = namespace;
  });

  return config;
};
