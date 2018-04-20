let get_dom_child_elements = $elem => {
  return u_assign([], (($elem.tagName == "TEMPLATE" && __compat_HTMLTemplateElement) ?
    $elem.content :
    $elem).children);
};
