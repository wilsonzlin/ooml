const CLASS_METADATA_OBJECT_STRUCTURE = {
    name: "NameOfClass",
    isAbstract: true || false,
    extends: "a string representing the unverified name of the class, not a fuction representing the actual class",

    constructor: function unbindedConstructor() {} || undefined,
    rootElem: HTMLElement,

    properties: {
        nameOfProp: {
            types: ["string", "natural", "null"] || [class SomeOOMLClass {}] || undefined,
            value: "the default value" || undefined,
            isArray: true || false,

            getter: "someOwnMethod" || undefined,
            setter: "someOwnMethod" || undefined,
            onChange: "someOwnMethod" || undefined,

            isSuppressed: false,
            isAttribute: true,

            bindingIsDynamic: true || false,
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
