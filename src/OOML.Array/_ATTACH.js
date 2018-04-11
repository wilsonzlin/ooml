OOMLArrayProto[OOML_ARRAY_PROPNAME_ATTACH] = function (parent, property, realDomAnchor) {
  let arrayAnchor = this[OOML_ARRAY_PROPNAME_DOM_ANCHOR];

  if (this[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE]) {
    // Even though this is an internal function, it is called when assigning this to a
    // property, which is external logic, so this exception should have an appropriate
    // type and message
    throw ReferenceError(`This array is already attached`);
  }

  this[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE] = parent;
  this[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_PROPERTY] = property;

  // It's possible for an instance to have an OOML.Array property but not substitute it into the view
  if (realDomAnchor) {
    realDomAnchor.parentNode.insertBefore(arrayAnchor, realDomAnchor.nextSibling);
  }
};
