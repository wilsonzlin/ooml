OOMLInstanceProto[OOML_INSTANCE_PROPNAME_ATTACH] = function (settings) {
  let instance = this;
  let instanceDom = instance[OOML_INSTANCE_PROPNAME_DOMELEM];
  let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

  if (instanceIsAttachedTo.parent) {
    throw ReferenceError(`This instance is already in use`);
  }

  instanceIsAttachedTo.parent = settings.parent;
  instanceIsAttachedTo.property = settings.property;

  settings.insertAfter.parentNode.insertBefore(instanceDom, settings.insertAfter.nextSibling);
};
