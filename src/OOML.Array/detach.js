OOMLArrayProto.detach = function() {
    let instanceIsAttachedTo = this[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE];

    if (!instanceIsAttachedTo) {
        throw new ReferenceError(`This array is not attached to anything`);
    }

    // This will call __oomlArrayDetach
    instanceIsAttachedTo[this[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_PROPERTY]] = null;

    return this;
};
