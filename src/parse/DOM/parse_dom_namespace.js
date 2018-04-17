let parse_dom_namespace = ($namespace, anonymous) => {
  let config = validate_dom_attrs($namespace, {
    ooml: {
      skip: true,
    },
    name: anonymous ? undefined : {
      validator: valid_namespace_name,
    },
  });
  config.classes = {};
  config.instantiations = [];

  u_iterate($namespace.children, $child => {
    let type = $child.getAttribute("ooml");

    if (type == "inst") {
      if (!anonymous) {
        throw SyntaxError(`Instantiation in anonymous namespace`);
      }

      try {
        config.instantiations.push(parse_dom_inst($child));
      } catch (e) {
        e.message += `\n    in namespace "${config.name}"`;
        throw e;
      }

      return;
    }

    if (type != "class") {
      throw SyntaxError(`Invalid ooml tag type "${type}"`);
    }

    let klass;
    try {
      klass = parse_dom_class($child, false);
    } catch (e) {
      e.message += `\n    in namespace "${config.name}"`;
      throw e;
    }

    if (config.classes[klass.name]) {
      throw ReferenceError(`Duplicate class "${klass.name}"`);
    }
    config.classes[klass.name] = klass;
  });

  return config;
};
