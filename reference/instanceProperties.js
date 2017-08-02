const INSTANCE_PROPERTIES_OBJECT_STRUCTURE = {
    nameOfProp: {
        currentValue: "current value" || 1.6 || true || null || OOML.Element || OOML.Array || Object /* if transient */ || undefined /* if initial */,

        // This might not be a primitive or transient property, so it uses .insertAfter instead
        nodes: NodeSet || undefined,

        // "bindingId" and "bindingState" only exist if there is a binding
        bindingId: 5 || undefined,
        bindingState: 0 || 1 || 2,
        // "bindingParts" only exists if there is a binding and it is dynamic
        bindingParts: ["users.", "", ".age"] || undefined,

        // It's possible for an instance to have an OOML.Array property but not substitute it into the view
        // This could also be a primitive or transient property
        insertAfter: Node || undefined,
    },
};
