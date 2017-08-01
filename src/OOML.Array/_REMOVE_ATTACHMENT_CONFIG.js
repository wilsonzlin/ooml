// This is the internal detach method, and is used by internal code that doesn't need to have checks
// .detach runs checks and then calls functions that call this; this only removes own references
// (i.e. doesn't remove from parent instance)
OOMLArrayProto[OOML_ARRAY_PROPNAME_DETACH] = function() {
    let oomlArray = this;

    let instanceIsAttachedTo = oomlArray[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE];

    if (!instanceIsAttachedTo) {
        throw new Error(`This array is not attached to anything`);
    }

    let arrayAnchor = oomlArray[OOML_ARRAY_PROPNAME_DOM_ANCHOR];
    // This removes it from the attached instance's DOM (if attached)
    // and moves it back to the internal placeholder DOM parent
    oomlArray[OOML_ARRAY_PROPNAME_INTERNAL_DOM_PARENT].appendChild(arrayAnchor);

    oomlArray[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE] =
        oomlArray[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_PROPERTY] = undefined;
};
