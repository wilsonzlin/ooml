let assert_param = (name, arg, type_pred, default_value) => {
  if (arg === undefined) {
    assert(default_value !== undefined, TypeError, `Argument for "${name}" not provided`);
    return default_value;

  } else if (!type_pred(arg)) {
    throw TypeError(`Value provided for "${name}" has wrong type`);
  }

  return arg;
};
