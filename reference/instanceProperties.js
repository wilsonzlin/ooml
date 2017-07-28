const INSTANCE_PROPERTIES_OBJECT_STRUCTURE = {
    nameOfProp: {
        currentValue: "current value" || undefined,

        // TODO Remove bindingIsDynamic, bindingPropertyToPartMap, bindingOnExist, bindingOnMissing
        bindingIsDynamic: true || false,
        bindingParts: ["users.", "", ".age"] || undefined,
        bindingPropertyToPartMap: {
            "userID": [1],
        } || undefined,
        bindingKeypath: undefined || "fixed.path.to.store.value",
        bindingOnExist: "someOwnMethod" || undefined,
        bindingOnMissing: "someOwnMethod" || undefined,
    },
};
