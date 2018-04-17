oomlArrayPrototype.detach = function () {
  let _this = this;

  let attachment_parent_instance = _this[__IP_OOML_ARRAY_OWN_ATTACHMENT_PARENT_INSTANCE];

  if (!attachment_parent_instance) {
    throw ReferenceError(`This array is not attached to anything`);
  }

  // This will call _REMOVE_ATTACHMENT_CONFIG
  attachment_parent_instance[_this[__IP_OOML_ARRAY_OWN_ATTACHMENT_PARENT_PROPERTY]] = null;

  return _this;
};
