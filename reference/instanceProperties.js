const INSTANCE_PROPERTIES_OBJECT_STRUCTURE = {
    nameOfProp: {
        currentValue: "current value" || 1.6 || true || null || OOML.Element || OOML.Array || Object || undefined,

        // This might not be a primitive or transient property, so it uses .insertAfter instead
        nodes: NodeSet || undefined,

        // "bindingId" only exists if there is a binding
        bindingId: 5 || undefined,
        // "bindingParts" only exists if there is a binding and it is dynamic
        bindingParts: ["users.", "", ".age"] || undefined,

        // It's possible for an instance to have an OOML.Array property but not substitute it into the view
        // This could also be a primitive or transient property
        insertAfter: Node || undefined,
    },
};
