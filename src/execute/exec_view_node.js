let exec_view_node = (bc_view_node, _this, properties_state) => {
  // Exposed DOM elements will be set on $_this
  // DOM event handlers will call methods on $_this
  // Substitution node placeholders/anchors will be added to $properties_state

  let queue = [[bc_view_node]];

  let cloned;

  let current;
  while (current = queue.shift()) {
    let bc_current = current[0];
    let parent = current[1];

    let node;

    if (bc_current[__BC_CLASSVIEW_NODE_ISTAG]) {
      // Create element
      node = document.createElement(bc_current[__BC_CLASSVIEW_NODE_TAGNAME]);

      if (bc_current[__BC_CLASSVIEW_NODE_EXPOSEKEY]) {
        // Expose DOM element
        Object.defineProperty(_this, "$" + bc_current[__BC_CLASSVIEW_NODE_EXPOSEKEY], {value: node});
      }

      if (bc_current[__BC_CLASSVIEW_NODE_DOMEVENTHANDLERS]) {
        // Set DOM event handlers
        u_enumerate(bc_current[__BC_CLASSVIEW_NODE_DOMEVENTHANDLERS], (method_name, event_name) => {
          node.addEventListener(event_name, event => {
            return _this[method_name](event);
          });
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
            // COMPATIBILITY - IE: Don't use .(get|set)Attribute(Node)? -- buggy behaviour in IE
            // This is an emulated Node instance
            let attr = u_new_clean_object();
            attr[__IP_OOML_EMUL_ATTR_NAME] = attr_name;
            attr[__IP_OOML_EMUL_ATTR_VALUEPARTS] = bc_attr[__BC_CLASSVIEW_ATTR_VALUEPARTS].slice();
            attr[__IP_OOML_EMUL_ATTR_VALUESUBMAP] = bc_attr[__BC_CLASSVIEW_ATTR_VALUESUBMAP];
            attr[__IP_OOML_EMUL_ATTR_OWNER] = node;

            u_iterate(u_keys(bc_attr[__BC_CLASSVIEW_ATTR_VALUESUBMAP]), prop_name => {
              properties_state[prop_name][__IP_OOML_PROPERTIES_STATE_NODES].push(attr);
            });
          }
        });
      }

      if (bc_current[__BC_CLASSVIEW_NODE_CHILDNODES]) {
        u_assign(queue, bc_current[__BC_CLASSVIEW_NODE_CHILDNODES].map(bc_child_node => {
          return [bc_child_node, node];
        }));
      }

      if (parent) {
        parent.appendChild(node);
      } else {
        cloned = node;
      }

    } else if (bc_current[__BC_CLASSVIEW_NODE_ISTEXT]) {
      // Create text
      node = document.createTextNode(bc_current[__BC_CLASSVIEW_NODE_VALUE] || "");
      parent.appendChild(node);

    } else { // Can only be bc_current[__BC_CLASSVIEW_NODE_ISSUB]
      // Create substitution placeholder/anchor
      // Use Text node even if instance/array substitution
      // (otherwise DOM will be littered with blank comments)
      node = document.createTextNode("");
      properties_state[bc_current[__BC_CLASSVIEW_NODE_SUBPROP]][__IP_OOML_PROPERTIES_STATE_NODES].push(node);
      parent.appendChild(node);
    }
  }

  return cloned;
};
