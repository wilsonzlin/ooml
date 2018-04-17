const INSTANCE_PROPERTIES_OBJECT_STRUCTURE = {
    nameOfProp: {
        currentValue: "current value" || 1.6 || true || null || OOML.Element || OOML.Array || Object /* if transient */ || undefined /* if initial */,

        nodes: [],

        // "bindingId" and "bindingState" only exist if there is a binding
        bindingId: 5 || undefined,
        bindingState: 0 || 1 || 2,
        // "bindingParts" only exists if there is a binding and it is dynamic
        bindingParts: ["users.", "", ".age"] || undefined,
    },
};
