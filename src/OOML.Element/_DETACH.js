OOMLElementProto[OOML_INSTANCE_PROPNAME_DETACH] = function() {
    let instance = this;
    let instanceDom = instance[OOML_INSTANCE_PROPNAME_DOMELEM];
    let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

    if (!instanceIsAttachedTo.parent) {
        throw new Error(`This instance is not in use`);
    }

    instanceIsAttachedTo.parent = undefined;

    instanceDom.parentNode.removeChild(instanceDom);
};
