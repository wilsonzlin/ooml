let SV_PARSE_DOM_PARSERS = {
  module: parse_dom_module,
  namespace: parse_dom_namespace,
  class: parse_dom_class,
  inst: parse_dom_instantiation,
};

let parse_dom = $top => {
  let modules = [];
  let anonymous_namespaces = [];
  let anonymous_classes = [];
  let top_level_instantiations = [];

  u_iterate(get_dom_child_elements($top), $child => {
    let type = $child.getAttribute("ooml");
    if (!type) {
      return;
    }

    let parser = SV_PARSE_DOM_PARSERS[type];
    if (!parser) {
      throw SyntaxError(`Invalid ooml tag type "${type}"`);
    }

    let parsed;

    switch (type) {
    case "module":
      parsed = parser($child);
      modules.push(parsed);
      break;

    case "namespace":
      parsed = parser($child, true);
      anonymous_namespaces.push(parsed);
      break;

    case "class":
      parsed = parser($child);
      anonymous_classes.push(parsed);
      break;

    case "inst":
      parsed = parser($child);
      top_level_instantiations.push(parsed);
      break;
    }

    __rt_dom_update_add_to_queue($child, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_POTENTIALLYREMOVE);
  });

  return [modules, anonymous_namespaces, anonymous_classes, top_level_instantiations];
};
