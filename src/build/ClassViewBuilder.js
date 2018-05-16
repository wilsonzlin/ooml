let ClassViewBuilder = function () {
  this[__IP_BUILDER_EXPOSE_KEYS] = new StringSet();
  this[__IP_BUILDER_SUBSTITUTION_COUNTS] = u_new_clean_object();
  this[__IP_BUILDER_DOM_EVENT_HANDLER_METHODS] = new StringSet();
};

let ClassViewBuilderPrototype = ClassViewBuilder.prototype = u_new_clean_object();

ClassViewBuilderPrototype.setRoot = function ($root) {
  // Don't assert instanceof Element as this might not be a browser

  let root;
  let queue = [[$root]];

  let extension_point_set = false;

  let current;
  while (current = queue.shift()) {
    let $current = current[0];
    let parent = current[1];
    let bc = u_new_clean_object();

    // Use nodeType as this might not be a browser
    if ($current.nodeType === 1) {
      let tag_name = $current.tagName.toLocaleLowerCase();

      if (tag_name == "ooml-extension-point") {
        if (extension_point_set) {
          throw SyntaxError(`Extension point already set`);
        }

        if (!parent) {
          throw SyntaxError(`Extension point cannot be root`);
        }

        extension_point_set = true;

        bc[__BC_CLASSVIEW_NODE_ISEXTENSIONPOINT] = true;

      } else {
        bc[__BC_CLASSVIEW_NODE_ISTAG] = true;
        bc[__BC_CLASSVIEW_NODE_DOMEVENTHANDLERS] = u_new_clean_object();
        bc[__BC_CLASSVIEW_NODE_ATTRS] = u_new_clean_object();
        bc[__BC_CLASSVIEW_NODE_CHILDNODES] = [];

        // Due to the way table tags are parsed in browsers, allow alternative syntax
        if (/^ooml-(?:table|thead|tbody|tfoot|tr|th|td|caption|col|colgroup)$/.test(tag_name)) {
          tag_name = tag_name.slice(5);
        }
        if (__reserved_view_tags_s.has(tag_name)) {
          throw SyntaxError(`Illegal tag "${tag_name}" in view`);
        }
        bc[__BC_CLASSVIEW_NODE_TAGNAME] = tag_name;

        u_iterate($current.attributes, $attr => {
          let attr_name = $attr.name.toLocaleLowerCase();
          let attr_value = $attr.value;

          if (/^handle/.test(attr_name)) {
            let handler_method = assert_valid_prop_or_method_reference_p_r("DOM event handler method", attr_value);
            bc[__BC_CLASSVIEW_NODE_DOMEVENTHANDLERS][attr_name.slice(6)] = handler_method;
            this[__IP_BUILDER_DOM_EVENT_HANDLER_METHODS].add(handler_method);

          } else if (/^on/.test(attr_name)) {
            throw SyntaxError(`on* view tag attribute is not allowed`);

          } else if (attr_name == "ooml-expose") {
            bc[__BC_CLASSVIEW_NODE_EXPOSEKEY] = assert_unique_in_stringset_s_r(
              "expose key",
              assert_valid_r("expose key", attr_value, valid_property_or_method_name),
              this[__IP_BUILDER_EXPOSE_KEYS]);

          } else {
            if (attr_name == "ooml-style") {
              // IE discards invalid style attributes (and ones with substitutions count as invalid),
              // so allow alternative syntax
              attr_name = "style";
            }

            let attr_bc = u_new_clean_object();
            attr_bc[__BC_CLASSVIEW_ATTR_NAME] = attr_name;

            let parts = [];
            let map = u_new_clean_object();

            stream_substitution_parts(attr_value, lit => {
              parts.push(lit);
            }, sub_prop => {
              sub_prop = assert_valid_prop_or_method_reference_p_r("substitution", sub_prop);

              let part_id = parts.push(undefined) - 1;
              if (!map[sub_prop]) {
                map[sub_prop] = [];
              }
              map[sub_prop].push(part_id);

              if (!this[__IP_BUILDER_SUBSTITUTION_COUNTS][sub_prop]) {
                this[__IP_BUILDER_SUBSTITUTION_COUNTS][sub_prop] = 0;
              }
              this[__IP_BUILDER_SUBSTITUTION_COUNTS][sub_prop]++;
            });

            if (valid_empty_object(map)) {
              // OK if parts[0] is undefined
              attr_bc[__BC_CLASSVIEW_ATTR_PLAINVALUE] = parts[0];
            } else {
              attr_bc[__BC_CLASSVIEW_ATTR_VALUEPARTS] = parts;
              attr_bc[__BC_CLASSVIEW_ATTR_VALUESUBMAP] = map;
            }

            bc[__BC_CLASSVIEW_NODE_ATTRS][attr_name] = attr_bc;
          }
        });

        u_assign(queue, u_map($current.childNodes, $child => [$child, bc]));
      }

      if (!parent) {
        root = bc;
      } else {
        parent[__BC_CLASSVIEW_NODE_CHILDNODES].push(bc);
      }

    } else if ($current.nodeType === 3) {
      stream_substitution_parts($current.data, lit => {
        let bc = u_new_clean_object();

        bc[__BC_CLASSVIEW_NODE_ISTEXT] = true;
        bc[__BC_CLASSVIEW_NODE_VALUE] = lit;

        parent[__BC_CLASSVIEW_NODE_CHILDNODES].push(bc);
      }, sub_prop => {
        sub_prop = assert_valid_prop_or_method_reference_p_r("substitution", sub_prop);

        let bc = u_new_clean_object();
        bc[__BC_CLASSVIEW_NODE_ISSUB] = true;
        bc[__BC_CLASSVIEW_NODE_SUBPROP] = sub_prop;

        parent[__BC_CLASSVIEW_NODE_CHILDNODES].push(bc);

        if (!this[__IP_BUILDER_SUBSTITUTION_COUNTS][sub_prop]) {
          this[__IP_BUILDER_SUBSTITUTION_COUNTS][sub_prop] = 0;
        }
        this[__IP_BUILDER_SUBSTITUTION_COUNTS][sub_prop]++;
      });
    }
  }

  this[__BC_CLASSVIEW_ROOT] = root;
};

ClassViewBuilderPrototype[__IP_BUILDER_PROTO_COMPILE] = function () {
  // Check required values have been provided
  assert_set("root", __BC_CLASSVIEW_ROOT, this);

  // Need to compile to make a copy, even with identical data
  return generate_bc_from_builder(this);
};
