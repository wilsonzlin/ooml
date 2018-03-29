OOMLArrayProto.detach = function () {
  let oomlArray = this;

  let instanceIsAttachedTo = oomlArray[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE];

  if (!instanceIsAttachedTo) {
    throw new ReferenceError(`This array is not attached to anything`);
  }

  // This will call __oomlArrayDetach
  instanceIsAttachedTo[oomlArray[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_PROPERTY]] = null;

  return oomlArray;
};
