let update_dom = (name, nodes, value, custom_html) => {
  let use_custom_html = u_typeof(custom_html, TYPEOF_STRING);
  let custom_html_is_empty; // Undefined if !$use_custom_html
  let custom_dom;

  if (use_custom_html) {
    custom_html = custom_html.trim();
    custom_html_is_empty = !custom_html;
  }

  // $custom_html may be empty, which means that custom HTML is still wanted
  // (i.e. don't write text value), but remove any current custom HTML
  if (use_custom_html && !custom_html_is_empty) {
    let dom = document.createElement("div");
    dom.innerHTML = custom_html;
    if (dom.children.length != 1) {
      throw SyntaxError(`Custom HTML has no or multiple root elements`);
    }
    custom_dom = dom.children[0];
  }

  u_iterate(nodes, node => {
    if (node instanceof Text) {
      // Delete any custom HTML, regardless if using or not
      if (node.nextSibling && node.nextSibling[__IP_OOML_CUSTOM_HTML_DOM_ELEMENT]) {
        delete node.nextSibling[__IP_OOML_CUSTOM_HTML_DOM_ELEMENT];
        node.parentNode.removeChild(node.nextSibling);
      }

      if (use_custom_html) {
        if (!custom_html_is_empty) {
          custom_dom[__IP_OOML_CUSTOM_HTML_DOM_ELEMENT] = true;

          node.parentNode.insertBefore(custom_dom, node.nextSibling);
        }

        node.data = "";

      } else {
        node.data = value;
      }

    } else {
      // Must be attribute
      u_iterate(node[__IP_OOML_EMUL_ATTR_VALUESUBMAP][name], index => {
        node[__IP_OOML_EMUL_ATTR_VALUEPARTS][index] = value;
      });

      __rt_updated_nodes.add(node);
    }
  });

  __rt_write_changes();
};
