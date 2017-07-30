const CLASS_METADATA_OBJECT_STRUCTURE = {
    name: "NameOfClass",
    isAbstract: true || false,
    parent: class SomeOOMLClass {} || undefined,

    constructor: function unbindedConstructor() {} || undefined,

    viewShape: {}, // TODO
    viewShapePathToExtensionPoint: [0, 5, 3] || undefined,

    properties: {
        nameOfProp: {
            types: ["string", "natural", "null"] || class SomeOOMLClass {} || undefined,
            defaultValue: "the default value",

            isArray: true || false,
            isInstance: true || false,

            getter: "this.someOwnMethod" || undefined,
            setter: "this.someOwnMethod" || undefined,
            onChange: "this.someOwnMethod" || undefined,

            isTransient: false,
            isAttribute: true,

            passthroughProperty: "propName" || undefined,
            dispatchEventHandlers: {}, // TODO

            bindingIsDynamic: true || false,
            bindingParts: ["users.", "", ".age"] || undefined,
            bindingPropertyToPartMap: {
                "userID": [1],
            } || undefined,
            bindingKeypath: undefined || "fixed.path.to.store.value",
            bindingOnExist: "this.someOwnMethod" || undefined,
            bindingOnMissing: "this.someOwnMethod" || undefined,
        },
    },
    methods: {
        nameOfMethod: {
            fn: function realFn() {},
        },
    },
};
