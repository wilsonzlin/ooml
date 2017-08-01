// This is the internal detach method, and is used by internal code that doesn't need to have checks
// .detach runs checks and then calls functions that call this; this only removes own references
// (i.e. doesn't remove from parent array or instance)
OOMLInstanceProto[OOML_INSTANCE_PROPNAME_DETACH] = function() {
    let instance = this;
    let instanceDom = instance[OOML_INSTANCE_PROPNAME_DOMELEM];
    let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

    if (!instanceIsAttachedTo.parent) {
        throw new Error(`This instance is not in use`);
    }

    instanceIsAttachedTo.parent = undefined;

    instanceDom.parentNode.removeChild(instanceDom);
};
