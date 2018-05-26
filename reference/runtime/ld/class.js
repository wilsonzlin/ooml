let prototype = {
  constructor: class extends ooml.instance {
  },
  namespace: constructor.namespace,
  module: constructor.module,

  ...{
    "propNames": {
      get: () => value,
      set: () => undefined,
    }
  },

  ...{"user-defined": "methods"},
};

module.exports = /* class extends ooml.instance */ {
  name: "ClassName",
  namespace: namespace || anon_classes,
  module: module || undefined,
  prototype: prototype,

  __IP_OOML_CLASS_OWN_COLLAPSED_PROPERTY_NAMES: ["prop", "names"],

  __IP_OOML_CLASS_OWN_COLLAPSED_PROPERTIES: {
    "propName": {
      __BC_CLASSPROP_CHANGE: ["parentListener", "thisListener"],
      __BC_CLASSPROP_BINDINGEXIST: ["parentListener", "thisListener"],
      __BC_CLASSPROP_BINDINGMISSING: ["parentListener", "thisListener"],
      __BC_CLASSPROP_DISPATCHHANDLERS: {
        "eventName": ["parentHandler", "thisHandler"],
      },

      __BC_CLASSPROP_ARRAY: "matches root bytecode",
      __BC_CLASSPROP_TRANSIENT: "matches root bytecode",
      __BC_CLASSPROP_PASSTHROUGH: "matches root bytecode",
      __BC_CLASSPROP_BINDING: "matches root bytecode",

      __IP_OOML_PROPERTIES_CONFIG_DEPENDENT_BINDINGS: ["someProp", "anotherProp"] || undefined,

      __BC_CLASSPROP_TYPE: class extends ooml.instance {
      } || "matches bytecode",
      __BC_CLASSPROP_DEFAULTVALUE: "matches bytecode",

      __BC_CLASSPROP_GET: "matches this bytecode",
      __BC_CLASSPROP_SET: "matches this bytecode",
    },
  },

  ...{"user-defined": "fields"},
};
