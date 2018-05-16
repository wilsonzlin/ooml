let exec_view_node = (bc_view_node, collapsed_properties) => {
  // Substitutions will be checked if they are instance or array properties using $collapsed_properties

  // Avoid objects whenever possible, as enumeration is slow
  // Only use for fast lookups and no enumeration
  let exposed_elems = [];
  let elems_with_event_handlers = [];
  let substitutions = [];
  let attrs_with_substitutions = [];

  let root = document.createDocumentFragment();

  let queue = [[bc_view_node, root, []]];

  let current;
  while (current = queue.shift()) {
    let bc_current = current[0];
    let parent = current[1];
    let path_from_root = current[2];

    let node;

    // TODO Extension point

    if (bc_current[__BC_CLASSVIEW_NODE_ISTAG]) {
      // Create element
      node = document.createElement(bc_current[__BC_CLASSVIEW_NODE_TAGNAME]);

      if (bc_current[__BC_CLASSVIEW_NODE_EXPOSEKEY]) {
        // Expose DOM element
        exposed_elems.push(["$" + bc_current[__BC_CLASSVIEW_NODE_EXPOSEKEY], path_from_root]);
      }

      if (bc_current[__BC_CLASSVIEW_NODE_DOMEVENTHANDLERS]) {
        // Set DOM event handlers
        u_enumerate(bc_current[__BC_CLASSVIEW_NODE_DOMEVENTHANDLERS], (method_name, event_name) => {
          elems_with_event_handlers.push([event_name, method_name, path_from_root]);
        });
      }

      if (bc_current[__BC_CLASSVIEW_NODE_ATTRS]) {
        // Set attributes
        u_enumerate(bc_current[__BC_CLASSVIEW_NODE_ATTRS], (bc_attr, attr_name) => {
          if (!bc_attr[__BC_CLASSVIEW_ATTR_VALUEPARTS]) {
            // Plain attribute
            node.setAttribute(attr_name, bc_attr[__BC_CLASSVIEW_ATTR_PLAINVALUE]);

          } else {
            // Attribute with substitutions
            let attr = [];
            attr[0] = attr_name;
            attr[1] = bc_attr[__BC_CLASSVIEW_ATTR_VALUEPARTS];
            attr[2] = bc_attr[__BC_CLASSVIEW_ATTR_VALUESUBMAP];
            // Optimisation: pre-enumerate keys
            attr[3] = u_keys(bc_attr[__BC_CLASSVIEW_ATTR_VALUESUBMAP]);
            attr[4] = path_from_root;

            attrs_with_substitutions.push(attr);
          }
        });
      }

      if (bc_current[__BC_CLASSVIEW_NODE_CHILDNODES]) {
        u_assign(queue, bc_current[__BC_CLASSVIEW_NODE_CHILDNODES].map((bc_child_node, child_no) => {
          return [bc_child_node, node, path_from_root.concat(child_no)];
        }));
      }


    } else if (bc_current[__BC_CLASSVIEW_NODE_ISTEXT]) {
      // Create text
      node = document.createTextNode(bc_current[__BC_CLASSVIEW_NODE_VALUE]);

    } else {
      // Can only be bc_current[__BC_CLASSVIEW_NODE_ISSUB]

      // Create substitution placeholder/anchor
      // IE9 removes empty text nodes when cloning, so put blank space
      let prop_name = bc_current[__BC_CLASSVIEW_NODE_SUBPROP];
      node = u_typeof(collapsed_properties[prop_name][__BC_CLASSPROP_TYPE], TYPEOF_FUNCTION) ?
        document.createComment("") :
        document.createTextNode(" ");

      substitutions.push([prop_name, path_from_root]);
    }

    parent.appendChild(node);
  }

  let rv = u_new_clean_object();
  // For some reason IE9 doesn't implement .children/.firstElementChild on HTMLDocumentFragment.prototype,
  // but this should work as root is guaranteed to be an element
  rv[__IP_OOML_VIEW_TEMPLATE_ROOT] = root.firstChild;
  rv[__IP_OOML_VIEW_EXPOSED_ELEMS] = exposed_elems;
  rv[__IP_OOML_VIEW_ELEMS_WITH_EVENT_HANDLERS] = elems_with_event_handlers;
  rv[__IP_OOML_VIEW_SUBSTITUTIONS] = substitutions;
  rv[__IP_OOML_VIEW_ATTRS_WITH_SUBSTITUTIONS] = attrs_with_substitutions;

  return rv;
};
