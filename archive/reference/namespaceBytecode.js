const NAMESPACE_BYTECODE_OBJECT_STRUCTURE = {
  classes: {
    "SomeClass": {
      name: "SomeClass",
      isAbstract: true || false,
      parent: class SomeOOMLClass {} || undefined,

      memberNames: new StringSet(),

      constructor: function unbindedConstructor () {} || undefined,
      initialiser: function init () {} || undefined,

      fields: {
        static_var: 1,
        static_var_2: "test",
        static_var_3: function () {}.bind(class ThisOOMLClass {}),
      },

      viewShape: ViewShape,
      viewShapePathToExtensionPoint: [0, 5, 3] || undefined,

      exposeKeys: StringSet,

      properties: {
        nameOfProp: {
          types: ["string", "natural", "null"] || class SomeOOMLClass {} || undefined,
          defaultValue: "the default value" || 4.35 || true || null || [] || {},

          isArray: true || false,
          isInstance: true || false,

          getter: "someOwnMethod" || undefined,
          setter: "someOwnMethod" || undefined,
          onChange: "someOwnMethod" || undefined,

          isTransient: true || false,
          isAttribute: true || false,

          passthroughProperty: "propName" || undefined,
          dispatchEventHandlers: {
            "click": "someOwnMethod",
          },

          // "bindingIsDynamic" is undefined if there is no binding
          bindingIsDynamic: true || false || undefined,
          bindingParts: ["users.", "", ".age"] || undefined,
          bindingPropertyToPartMap: {
            "userID": [1],
          } || undefined,
          bindingKeypath: undefined || "fixed.path.to.store.value",
          bindingOnExist: "someOwnMethod" || undefined,
          bindingOnMissing: "someOwnMethod" || undefined,
        },
      },

      methods: {
        nameOfMethod: {
          fn: function realFn () {
          },
        },
      },
    },
  },
};
