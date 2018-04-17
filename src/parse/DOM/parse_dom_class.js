let SV_PARSE_DOM_CLASS_CONTENT_PARSERS = {
  P: parse_dom_class_property,
  M: parse_dom_class_method,
  F: parse_dom_class_field,
  I: parse_dom_class_initialiser,
};

let parse_dom_class = ($class, anonymous) => {
  let config = collect_dom_attrs($class, {
    ooml: {
      skip: true,
    },
    name: {},
    parent: {},
    abstract: {
      boolean: true,
    },
  });
  config.anonymous = anonymous;
  config.properties = {};
  config.methods = {};
  config.fields = {};
  config.initialisers = [];
  config.view = undefined;

  u_iterate($class.children, $child => {
    if (config.view) {
      throw SyntaxError(`Nothing can come after a view declaration`);
    }

    let type = $child.tagName;

    let parser = SV_PARSE_DOM_CLASS_CONTENT_PARSERS[type];
    if (!parser) {
      if (!config.view) {
        throw SyntaxError(`Invalid ooml tag type "${type}"`);
      }
      config.view = $child;
      return;
    }

    let parsed;
    try {
      parsed = parser($child);
    } catch (e) {
      e.message += `\n    in class "${config.name}"`;
      throw e;
    }

    switch (type) {
    case "P":
      // TODO
      // TODO Check binding references and property name is unique member name
      if (own_member_names.has(parsed.name)) {
        throw ReferenceError(`Duplicate member "${parsed.name}"`);
      }
      break;

      // TODO
    }
  });

  return config;
};
