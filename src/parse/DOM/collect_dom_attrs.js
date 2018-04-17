let collect_dom_attrs = ($elem, schema) => {
  let config = u_new_clean_object();

  let glob_rules = u_keys(schema).filter(rule_name => schema[rule_name].glob);

  // Let builders handle most validation (including missing and optional)
  // when $config is eventually passed to it after parsing
  u_iterate($elem.attributes, $attr => {
    let name = $attr.name;
    let value = $attr.value;

    // Don't need to check for duplicates, because browser's don't support it

    let rule_name = name;
    let rules = schema[rule_name];
    let glob_key;
    if (!rules) {
      rule_name = glob_rules.find(rule_name => schema[rule_name].glob.test(name));
      if (!rule_name) {
        throw SyntaxError(`Unrecognised DOM attribute "${name}"`);
      }
      rules = schema[rule_name];
      glob_key = rules.glob.exec(name).slice(1).join("");
    }

    if (rules.skip) {
      return;
    }

    if (rules.boolean) {
      if (value !== "") {
        throw SyntaxError(`Boolean DOM attribute "${name}" has value "${value}"`);
      }
      value = true;

    } else {
      value = value.trim();
    }

    if (glob_key) {
      if (!config[rule_name]) {
        config[rule_name] = u_new_clean_object();
      }
      config[rule_name][glob_key] = value;
    } else {
      config[name] = value;
    }
  });

  u_enumerate(schema, (rules, name) => {
    if (rules.boolean && !rules.glob && !config[name]) {
      config[name] = false;
    }
  });

  return config;
};
