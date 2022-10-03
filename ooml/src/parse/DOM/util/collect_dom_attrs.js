let collect_dom_attrs = ($elem, schema) => {
  let collected = u_new_clean_object();

  // Rules with a glob
  let glob_rules = u_keys(schema).filter(rule_name => schema[rule_name].glob);

  // Let builders handle most validation (including missing and optional)
  // when $collected is eventually passed to it after parsing

  u_iterate($elem.attributes, $attr => {
    let name = $attr.name;
    let value = $attr.value;

    // Don't need to check for duplicate attributes,
    // because browser's don't support it

    let rule_name = name;
    let rules = schema[rule_name];
    let glob_key;

    if (!rules) {
      // No rule is an exact match for attribute,
      // find a rule with glob that matches
      rule_name = glob_rules.find(rule_name => schema[rule_name].glob.test(name));
      if (!rule_name) {
        // Not even a glob rule matches
        throw SyntaxError(`Unrecognised DOM attribute "${name}"`);
      }
      rules = schema[rule_name];
      glob_key = rules.glob.exec(name).slice(1).join("");
    }

    if (rules.skip) {
      // Don't collect attribute
      return;
    }

    if (rules.boolean) {
      // Boolean attribute
      if (value !== "") {
        throw SyntaxError(`Boolean DOM attribute "${name}" has value "${value}"`);
      }
      value = true;

    } else {
      // Non-boolean attribute
      value = value.trim();
    }

    if (glob_key) {
      if (!collected[rule_name]) {
        collected[rule_name] = u_new_clean_object();
      }
      collected[rule_name][glob_key] = value;
    } else {
      collected[name] = value;
    }
  });

  u_enumerate(schema, (rules, name) => {
    // Set all boolean attributes to false if not provided
    if (rules.boolean && !rules.glob && !collected[name]) {
      collected[name] = false;
    }
  });

  return collected;
};
