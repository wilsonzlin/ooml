let SV_PARSE_DOM_PARSERS = {
  class: parse_dom_class,
  inst: parse_dom_instantiation,
};

let parse_dom = $top => {
  let classes = [];
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
    case "class":
      parsed = parser($child);
      classes.push(parsed);
      break;

    case "inst":
      parsed = parser($child);
      top_level_instantiations.push(parsed);
      break;
    }

    __rt_dom_update_add_to_queue($child, __IP_OOML_RUNTIME_DOM_UPDATE_TREE_ACTION_ENUMVAL_POTENTIALLYREMOVE);
  });

  return [classes, top_level_instantiations];
};
