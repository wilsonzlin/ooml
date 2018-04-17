let SV_PARSE_DOM_PARSERS = {
  group: parse_dom_group,
  module: parse_dom_module,
  namespace: parse_dom_namespace,
  class: parse_dom_class,
  inst: parse_dom_inst,
};

let parse_dom = $top => {
  let modules = [];

  u_iterate($top.children, $child => {
    let type = $child.getAttribute("ooml");
    if (!type) {
      return;
    }

    let parser = SV_PARSE_DOM_PARSERS[type];
    if (!parser) {
      throw SyntaxError(`Invalid ooml tag type "${type}"`);
    }

    let parsed;
    try {
      parsed = parser($child);
    } catch (e) {
      e.message += `\n    in top level`;
      throw e;
    }

    switch (type) {
    case "group":
      // TODO
      break;

    case "module":
      // TODO
      break;

    case "namespace":
      // TODO
      break;

    case "class":
      // TODO
      break;

    case "inst":
      // TODO
      break;
    }
  });

  return modules;
};
