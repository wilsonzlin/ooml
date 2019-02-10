let TypeBuilder = function () {
  this[__BC_TYPE_ARGUMENTS] = [];
};

let TypeBuilderPrototype = TypeBuilder.prototype = u_new_clean_object();

let __type_core_enum_map = {
  "number": __BC_TYPE_CORE_ENUMVAL_BUILTIN_NUMBER,
  "string": __BC_TYPE_CORE_ENUMVAL_BUILTIN_STRING,
  "boolean": __BC_TYPE_CORE_ENUMVAL_BUILTIN_BOOLEAN,

  "list": __BC_TYPE_CORE_ENUMVAL_BUILTIN_LIST,
  "map": __BC_TYPE_CORE_ENUMVAL_BUILTIN_MAP,
  "set": __BC_TYPE_CORE_ENUMVAL_BUILTIN_SET,

  "datetime": __BC_TYPE_CORE_ENUMVAL_BUILTIN_DATETIME,

  "object": __BC_TYPE_CORE_ENUMVAL_BUILTIN_OBJECT,

  "any": __BC_TYPE_CORE_ENUMVAL_BUILTIN_ANY,
  "void": __BC_TYPE_CORE_ENUMVAL_BUILTIN_VOID,
  "self": __BC_TYPE_CORE_ENUMVAL_BUILTIN_SELF,

  "class": __BC_TYPE_CORE_ENUMVAL_BUILTIN_CLASS,
};

TypeBuilderPrototype.setCore = function (raw_core) {
  let core = __type_core_enum_map[assert_typeof_r("core", raw_core, TYPEOF_STRING)];
  if (!core) {
    // If no built-in type matched, assume class type
    core = __BC_TYPE_CORE_ENUMVAL_CUSTOM_CLASS;
    assert_valid_r("class reference", raw_core, valid_class_reference);
    this[__BC_TYPE_CUSTOMCLASS] = raw_core;
  }

  this[__BC_TYPE_CORE] = core;
};

TypeBuilderPrototype.addArgument = function (arg) {
  assert_instanceof_r("type argument", arg, TypeBuilder);

  this[__BC_TYPE_ARGUMENTS].push(arg);
};

TypeBuilderPrototype.isNullable = function (nullable) {
  assert_typeof_r("nullable", nullable, TYPEOF_BOOLEAN);

  this[__BC_TYPE_NULLABLE] = nullable;
};

TypeBuilderPrototype[__IP_BUILDER_PROTO_VALIDATE] = function () {
  // TODO
};
