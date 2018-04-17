let u_validate_object = (attrs, schema) => {
  let result = {};
  let unmatched_schema_props = u_keys(schema)
    .filter(prop_name => !schema[prop_name].skip);
  let glob_schema_prop_names = u_keys(schema).filter(prop_name => schema[prop_name].glob);

  u_enumerate(attrs, (attr_val, attr_name) => {
    let schema_prop_name = attr_name;
    let schema_prop_rules = schema[schema_prop_name];
    // If glob, value is an array of { key: $glob_key, value: $attr_val }
    // $glob_key is formed by matching $attr_name against schema.prop.glob regex and joining the matched groups
    let glob_key;
    if (schema_prop_rules == undefined) {
      // Try to find a glob schema prop that matches
      schema_prop_name = glob_schema_prop_names.find(pn => schema[pn].glob.test(schema_prop_name));
      if (schema_prop_name == undefined) {
        throw ReferenceError(`Unrecognised "${ attr_name }" attribute`);
      }
      schema_prop_rules = schema[schema_prop_name];
      glob_key = schema_prop_rules.glob.exec(attr_name).slice(1).join("");
    }

    if (schema_prop_rules.skip) {
      return;
    }

    if (!schema_prop_rules.noTrim && !u_typeof(attr_val, TYPEOF_STRING)) {
      attr_val = attr_val.trim();
    }

    if (schema_prop_rules.type && !u_typeof(schema_prop_rules.type, attr_val)) {
      throw TypeError(`Attribute "${attr_name}" should have a ${schema_prop_rules.type} value`);
    }

    if (u_has_own_property(schema_prop_rules, "equals") && attr_val !== schema_prop_rules.equals) {
      throw SyntaxError(`Attribute "${attr_name}" is not "${schema_prop_rules.equals}"`);
    }

    // Still need to trim with valid_non_empty_string in case noTrim
    if (schema_prop_rules.notEmptyStr && !valid_non_empty_string(attr_val)) {
      throw SyntaxError(`Attribute "${attr_name}" has a blank value`);
    }

    if (schema_prop_rules.regex && (!u_typeof(attr_val, TYPEOF_STRING) || !schema_prop_rules.regex.test(attr_val))) {
      throw SyntaxError(`Attribute "${attr_name}" has a malformed value`);
    }

    if (schema_prop_rules.validator && !schema_prop_rules.validator(attr_val)) {
      throw SyntaxError(`Attribute "${attr_name}" has an invalid value`);
    }

    if (glob_key != undefined) {
      if (!result[schema_prop_name]) {
        result[schema_prop_name] = [];
      }
      result[schema_prop_name].push({key: glob_key, value: attr_val});
    } else {
      result[schema_prop_name] = attr_val;
    }

    unmatched_schema_props.splice(unmatched_schema_props.indexOf(schema_prop_name), 1);
  });

  unmatched_schema_props.forEach(prop_name => {
    if (u_has_own_property(schema[prop_name], "default")) {
      result[prop_name] = schema[prop_name].default;
      return;
    }

    if (schema[prop_name].optional) {
      return;
    }

    throw SyntaxError(`Required attribute "${prop_name}" is missing`);
  });

  return result;
};
