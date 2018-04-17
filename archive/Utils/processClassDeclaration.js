let Utils_processClassDeclaration = config => {
  let otherClasses = config.otherClasses;
  let templateElem = config.templateElem;

  let className;
  let classIsAbstract;
  let classParentName; // `undefined` default
  let classParent;

  let classProperties = Utils_createCleanObject();
  let classMethods = Utils_createCleanObject();
  let classExposeKeys = new StringSet();

  let classConstructor;
  let classViewShape;

  let classRawDom;
  let classViewShapePathToExtensionPoint; // `undefined` default

  // Check that class name is unique
  if (otherClasses[className]) {
    throw ReferenceError(`The class "${ className }" already exists`);
  }

  if (classParentName) {
    classParent = Utils_getClassFromString(otherClasses, classParentName);
  } else {
    classParent = OOML.Instance;
  }

  // Get all nodes in template to process
  let templateContent = OOMLCompatTemplateExists ?
    templateElem.content :
    templateElem;

  let linkedMethods = new StringSet();
  let linkedProperties = new StringSet();

  Utils_iterate(templateContent.childNodes, node => {
    if (classRawDom) {
      throw SyntaxError(`The class "${ className }" has more than one root element`);
    }

    switch (node.nodeName) {
    case "P":

      let dispatchEventHandlers = Utils_createCleanObject();

      let propBindingParts;
      let propBindingPropertyToPartMap;
      let propBindingIsDynamic;
      let propBindingKeypath;
      let propBindingOnExist;
      let propBindingOnMissing;

      let bindingConfig;

      // Process DOM attributes
      Utils_iterate(node.attributes, attr => {
        let domAttrName = attr.name;
        let domAttrValue = attr.value;

        switch (domAttrName) {
        case "binding":
          if (Utils_isNotOrBlankString(domAttrValue)) {
            throw SyntaxError(`Empty binding key`);
          }

          bindingConfig = Utils_parseBindingDeclaration(domAttrValue.trim());
          propBindingIsDynamic = bindingConfig.isDynamic;
          propBindingParts = bindingConfig.parts;
          propBindingPropertyToPartMap = bindingConfig.propertyToPartMap;
          if (propBindingPropertyToPartMap) {
            Object.keys(propBindingPropertyToPartMap)
              .forEach(propName => linkedProperties.add(propName));
          }

          propBindingKeypath = bindingConfig.keypath;
          break;
        }
      });


      // Keep this object flat
      classProperties[propName] = Object.freeze({
        bindingIsDynamic: propBindingIsDynamic,
        bindingParts: propBindingParts,
        bindingPropertyToPartMap: propBindingPropertyToPartMap,
        bindingKeypath: propBindingKeypath,
        bindingOnExist: propBindingOnExist,
        bindingOnMissing: propBindingOnMissing,

        types: propTypes,
        defaultValue: propDefaultValue,

        isArray: isArraySubstitution,
        isInstance: isInstanceSubstitution,

        getter: propGetter,
        setter: propSetter,
        onChange: onchangeListener,

        isTransient: isSuppressed,
        isAttribute: isAttribute,

        passthroughProperty: passthroughPropName,

        dispatchEventHandlers: dispatchEventHandlers,
      });

      break;

    default:
      classRawDom = node;
    }
  });

  // Inherit properties before continuing
  // OOML.Instance doesn't have OOML_CLASS_PROPNAME_PROPERTIES
  if (classParent[OOML_CLASS_PROPNAME_PROPERTIES]) {
    // Should not need to clone as all classProperties objects are 1) frozen and 2) are never/shouldn't be mutated
    // Shouldn't need to run checks on inherit properties (e.g. whether method exists, binding properties are valid,
    // passthrough is correct, etc.), as if they passed on the parent, they should pass here
    let parentClassProperties = classParent[OOML_CLASS_PROPNAME_PROPERTIES];
    Object.keys(classProperties)
      .forEach(propName => {
        let thisClassProperty = classProperties[propName];
        let parentClassProperty = parentClassProperties[propName];

        if (parentClassProperty) {
          let thisTypes = thisClassProperty.types;
          let parentTypes = parentClassProperty.types;

          // If the parent has no types or has primitive types, this property must have exactly the same
          // If the parent has an OOML class as its type, this property must have the same class or a descendant
          if (
            parentTypes == undefined && thisTypes != undefined ||
            Utils_typeOf(parentTypes, TYPEOF_FUNCTION) &&
            !(thisTypes != parentTypes && !(thisTypes.prototype instanceof parentTypes)) ||
            parentTypes.slice()
              .sort()
              .join("|") != thisTypes.slice()
              .sort()
              .join("|")
          ) {
            throw TypeError(`Types for property "${ propName }" on class "${ className }" is incompatible with its parent`);
          }

          // If the parent property is an array, transient, or attribute, it must be the same on this property
          // Everything else can be overriden
          if (
            parentClassProperty.isArray && !thisClassProperty.isArray ||
            parentClassProperty.isTransient && !thisClassProperty.isTransient ||
            parentClassProperty.isAttribute && !thisClassProperty.isAttribute
          ) {
            throw TypeError(`Property "${ propName }" on class "${ className }" is incompatible with its parent`);
          }
        }
      });
    classProperties = Utils_concat(parentClassProperties, classProperties);
  }

  // Check that methods linked to have been declared
  linkedMethods.forEach(methodName => {
    if (!classMethods[methodName]) {
      throw ReferenceError(`The method "${ methodName }" is linked to, but has not been declared`);
    }
  });

  // Check that properties dependent by bindings are valid
  linkedProperties.forEach(propName => {
    let classProperty = classProperties[propName];
    if (!classProperty || classProperty.isArray || classProperty.isInstance) {
      throw ReferenceError(`A property has a binding dependent on "${ propName }", but "${ propName }" does not exist, or is an array/instance property`);
    }
  });

  if (classRawDom) {
    if (classRawDom.nodeName == "OOML-EXTENSION-POINT") {
      throw SyntaxError(`The extension point cannot be the root`);
    }
  } else {
    // Non-abstract classes must have a DOM
    if (!classIsAbstract) {
      throw SyntaxError(`The class "${ className }" does not have a view`);
    }
  }

  // Remove the class declaration from the DOM
  if (templateElem.parentNode) {
    templateElem.parentNode.removeChild(templateElem);
  }

  // Prevent data-* attributes on the root element (as attribute properties should be used)
  Utils_iterate(classRawDom.attributes, attr => {
    if (/^data-/i.test(attr.name)) {
      throw SyntaxError(`Data attributes are not allowed on the root element (class "${className}")`);
    }
  });

  if (classRawDom) {
    let realPathToExtensionPoint = {
      found: false,
    };
    // Since array and instance substitutions can only occur once per property, keep track of them
    let arrayOrInstanceSubstitutionsCount = Utils_createCleanObject();
    classViewShape = Utils_transformClassRawDomToViewShape(classProperties, classMethods, classRawDom, arrayOrInstanceSubstitutionsCount, classExposeKeys, [], realPathToExtensionPoint);
    classViewShapePathToExtensionPoint = realPathToExtensionPoint.path;
  }

  // Inherit shape
  if (classParent[OOML_CLASS_PROPNAME_EXTENSIONPOINT_PATH]) {
    let parentClassViewShape = classParent[OOML_CLASS_PROPNAME_VIEW_SHAPE];
    let extendedViewShape = Utils_deepClone(parentClassViewShape);

    let pathToExtensionPoint = classParent[OOML_CLASS_PROPNAME_EXTENSIONPOINT_PATH].slice();
    let childNoOfExtensionPoint = pathToExtensionPoint.pop();

    let parentElementOfExtensionPoint = extendedViewShape;
    pathToExtensionPoint.forEach(childNo => {
      parentElementOfExtensionPoint = parentElementOfExtensionPoint.childNodes[childNo];
    });

    // Abstract classes may not have a DOM
    if (classViewShape) {
      parentElementOfExtensionPoint.splice(childNoOfExtensionPoint, 1, classViewShape);
    } else {
      parentElementOfExtensionPoint.splice(childNoOfExtensionPoint, 1);
    }
    classViewShape = extendedViewShape;
  }

  // Keep this object flat; only "properties" and "methods" can be nested
  return Object.freeze({
    name: className,
    isAbstract: classIsAbstract,
    parent: classParent,

    properties: Object.freeze(classProperties),
    methods: Object.freeze(classMethods),
    exposeKeys: classExposeKeys,

    constructor: classConstructor,
    // Don't really need to freeze, as shape is traversed, not directly accessed
    // Same as all other properties that are arrays or maps
    viewShape: classViewShape,
    viewShapePathToExtensionPoint: classViewShapePathToExtensionPoint,
  });
};
