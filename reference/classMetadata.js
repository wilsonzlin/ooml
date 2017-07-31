const CLASS_METADATA_OBJECT_STRUCTURE = {
    name: "NameOfClass",
    isAbstract: true || false,
    parent: class SomeOOMLClass {} || undefined,

    constructor: function unbindedConstructor() {} || undefined,

    viewShape: {}, // TODO
    viewShapePathToExtensionPoint: [0, 5, 3] || undefined,

    exposeKeys: StringSet,

    properties: {
        nameOfProp: {
            types: ["string", "natural", "null"] || class SomeOOMLClass {} || undefined,
            defaultValue: "the default value" || [] || {},

            isArray: true || false,
            isInstance: true || false,

            getter: "someOwnMethod" || undefined,
            setter: "someOwnMethod" || undefined,
            onChange: "someOwnMethod" || undefined,

            isTransient: false,
            isAttribute: true,

            passthroughProperty: "propName" || undefined,
            dispatchEventHandlers: {}, // TODO

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
