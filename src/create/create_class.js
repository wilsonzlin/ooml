let create_class = config => {
  config = u_validate_object(config, {
    name: {
      validator: valid_class_name,
    },
    parent: {
      validator: valid_class_reference,
    },
    abstract: {
      type: TYPEOF_BOOLEAN,
    },
    anonymous: {
      type: TYPEOF_BOOLEAN,
    },
    properties: {}
    // TODO Nested array and object properties
  });
  config.properties = {};
  config.methods = {};
  config.fields = {};
  config.initialisers = [];

  let own_member_names = new StringSet();
  let view;

  u_iterate($class.children, $child => {
    if (view) {
      throw SyntaxError(`Nothing can come after a view declaration`);
    }

    let type = $child.tagName;

    let parser = SV_PARSE_DOM_CLASS_CONTENT_PARSERS[type];
    if (!parser) {
      if (!view) {
        throw SyntaxError(`Invalid ooml tag type "${type}"`);
      }
      // TODO
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
};
