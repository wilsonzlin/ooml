OOMLElementProto.detach = function() {
    let instance = this;

    let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

    if (!instanceIsAttachedTo.parent) {
        throw new ReferenceError(`This instance is not in use`);
    }

    let parent = instanceIsAttachedTo.parent;

    if (parent instanceof OOML.Array) {
        let indexOfThis = parent.indexOf(instance);
        if (indexOfThis < 0) {
            throw new Error(`This instance could not be found on its parent array`);
        }
        // This will call __oomlDetach
        parent.splice(indexOfThis, 1);
    } else if (parent instanceof OOML.Element) {
        // This will call __oomlDetach
        parent[instanceIsAttachedTo.property] = null;
    } else {
        throw new Error(`Unrecognised parent`);
    }

    return instance;
};
