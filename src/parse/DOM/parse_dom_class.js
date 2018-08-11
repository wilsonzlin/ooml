let SV_PARSE_DOM_CLASS_CONTENT_PARSERS = {
  P: parse_dom_class_property,
  M: parse_dom_class_method,
  F: parse_dom_class_field,
  I: parse_dom_class_initialiser,
};

let parse_dom_class = $class => {
  let config = collect_dom_attrs($class, {
    ooml: {
      skip: true,
    },
    fqn: {},
    parent: {},
    abstract: {
      boolean: true,
    },
  });
  config.properties = {};
  config.methods = {};
  config.fields = {};
  config.initialisers = [];
  // View will only be set if provided

  u_iterate(get_dom_child_elements($class), $child => {
    if (config.view) {
      throw SyntaxError(`Nothing can come after a view declaration`);
    }

    let type = $child.tagName;

    let parser = SV_PARSE_DOM_CLASS_CONTENT_PARSERS[type];
    if (!parser) {
      if (config.view) {
        throw SyntaxError(`Invalid ooml tag type "${type}"`);
      }
      config.view = $child;
      return;
    }

    let parsed = parser($child);

    switch (type) {
    case "P":
      config.properties[parsed.name] = parsed;
      break;

    case "M":
      config.methods[parsed.name] = parsed;
      break;

    case "F":
      config.fields[parsed.name] = parsed;
      break;

    case "I":
      config.initialisers.push(parsed);
      break;
    }
  });

  return config;
};
