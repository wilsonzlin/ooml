let Utils_createOOMLClass = config => {
  oomlClass[OOML_CLASS_PROPNAME_VIEW_SHAPE] = classViewShapePathToExtensionPoint && classViewShape;
  oomlClass[OOML_CLASS_PROPNAME_EXTENSIONPOINT_PATH] = classViewShapePathToExtensionPoint;
  oomlClass[OOML_CLASS_PROPNAME_ROOTELEMTAGNAME] = classViewShape && classViewShape.name;
  oomlClass[OOML_CLASS_PROPNAME_PROPERTIES_TO_DEPENDENT_BINDINGS] = classPropertiesToDependentBindings;

  return oomlClass;
};
