let __reserved_prop_method_names_s = new StringSet([
  // Don't allow overriding `toString`, `toLocaleString`, and `valueOf`
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf",

  // Mirror with ooml class prototype properties
  "module",
  "namespace",

  // Mirror with ooml.EventSource and ooml.Instance prototypes
  "addDispatchHandler",
  "addChangeListener",
  "dispatch",
  "toJSON",
]);
