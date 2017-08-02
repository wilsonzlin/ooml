const CLASS_METADATA_OBJECT_STRUCTURE = {
    name: "NameOfClass",
    isAbstract: true || false,
    parent: class SomeOOMLClass {} || undefined,

    constructor: function unbindedConstructor() {} || undefined,

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
            fn: function realFn() {},
        },
    },
};
