OOML.Namespace = function (namespace, settings) {
  // For minifying, and to allow access from any scope
  let oomlNamespaceInstance = this;

  // Ensure `new` keyword was used
  if (!(oomlNamespaceInstance instanceof OOML.Namespace)) {
    throw new SyntaxError(`OOML.Namespace must be constructed`);
  }

  // Default to document.body as namespace
  if (namespace === undefined) {
    namespace = document.body;

    // Find element matching selector, or used provided HTML
  } else if (Utils.typeOf(namespace, TYPEOF_STRING)) {
    namespace = namespace.trim();

    // Determine if HTML by first non-whitespace character
    if (namespace[0] == "<") {
      let domParser = document.createElement("div");
      domParser.innerHTML = namespace;
      namespace = domParser;
    } else {
      let namespaceSelector = namespace;
      namespace = document.querySelector(namespace);
      if (!namespace) {
        throw new ReferenceError(`Namespace DOM element not found using selector ${ namespaceSelector }`);
      }
    }

    // Otherwise, must provide an element
  } else if (!(namespace instanceof HTMLElement)) {
    throw new TypeError(`Invalid namespace`);
  }

  // Check that a namespace has not already been constructed by any ancestor or descendant
  if (Utils.DOM.hasAncestorOrDescendantNamespace(namespace)) {
    throw new ReferenceError(`That namespace already exists`);
  }
  // Mark this so future .hasAncestorOrDescendantNamespace checks can know this was used as a namespace
  namespace[OOML_DOM_PROPNAME_ISNAMESPACE] = true;

  // The `settings` variable is optional, but must be an object literal if provided
  if (settings === undefined) {
    settings = {};
  } else if (!Utils.isObjectLiteral(settings)) {
    throw new TypeError(`Invalid settings object`);
  }

  // Prepare an object to store classes (parsed and imported); fill with global imports initially
  let classes = Utils.concat(OOMLGlobalImports);
  // To hold bootstrapped instances
  let instances = Utils.createCleanObject();

  // Iterate settings object rather than directly accessing properties
  // to check for non-existent settings that have been provided
  Object.keys(settings)
    .forEach(settingName => {
      let settingValue = settings[settingName];

      if (settingValue === undefined) {
        return;
      }

      switch (settingName) {
      case "imports":
        // `imports` looks like `{ ImportName: Function OOML.Instance, AnotherImportName: Function OOML.Instance }`
        // Note that the import name does not have to be the actual name of the class
        if (!Utils.isObjectLiteral(settingValue)) {
          throw new TypeError(`Invalid namespace imports`);
        }

        Object.keys(settingValue)
          .forEach(importName => {
            let importClass = settings.imports[importName];
            // It must be an OOML class (obviously)
            if (!Utils.isOOMLClass(importClass)) {
              throw new TypeError(`The value for the import "${ importName }" is not an OOML class`);
            }
            classes[importName] = importClass;
          });

        break;

      default:
        throw new ReferenceError(`"${ settingName }" is not a setting`);
      }
    });

  // Go through the namespace and find any OOML class declarations
  Utils.DOM.find(namespace, "template[ooml-class],template[ooml-abstract-class]")
    .forEach(classTemplateElem => {

      // See reference/classMetadata.js for reference
      let classMetadata = Utils.processClassDeclaration({
        otherClasses: classes,
        templateElem: classTemplateElem,
      });

      classes[classMetadata.name] = Utils.createOOMLClass({
        namespace: oomlNamespaceInstance,
        classMetadata: classMetadata,
      });
    });

  Utils.DOM.find(namespace, "[ooml-instantiate]")
    .forEach(instanceInstantiationElem => {

      let instDetails = instanceInstantiationElem.getAttribute("ooml-instantiate")
        .split(" ");
      let className = instDetails[0];
      let instanceName = instDetails[1];

      if (instances[instanceName]) {
        throw new ReferenceError(`An object already exists with the name "${ instanceName }"`);
      }

      let initState = Utils.getEvalValue(instanceInstantiationElem.textContent);
      let constructor = classes[className];
      if (!constructor) {
        throw new ReferenceError(`Unknown class "${ className }"`);
      }

      let classRootElemTagName = constructor[OOML_CLASS_PROPNAME_ROOTELEMTAGNAME];
      let instantiateElemTagName = instanceInstantiationElem.nodeName.toLocaleLowerCase();
      if (classRootElemTagName !== instantiateElemTagName) {
        throw new ReferenceError(`Instantiating class "${ className }" requires tag "${ classRootElemTagName }", got "${ instantiateElemTagName }"`);
      }
      let instance = new constructor(initState);

      instanceInstantiationElem.parentNode.insertBefore(instance[OOML_INSTANCE_PROPNAME_DOMELEM], instanceInstantiationElem.nextSibling);

      // Copy attributes on instantiation element to new instance's root element
      Utils.iterate(instanceInstantiationElem.attributes, attr => {
        let domAttrName = attr.name.toLocaleLowerCase();
        let domAttrValue = attr.value;

        if (domAttrName != "ooml-instantiate") {
          if (/^(data|handle)-/.test(domAttrName)) {
            throw new SyntaxError(`Illegal attribute "${ domAttrName }" on ooml-instantiate element`);
          }
          instance[OOML_INSTANCE_PROPNAME_DOMELEM].setAttribute(domAttrName, domAttrValue);
        }
      });

      // Remove after attaching constructed elem
      instanceInstantiationElem.parentNode.removeChild(instanceInstantiationElem);

      instances[instanceName] = instance;
    });

  this.classes = Object.freeze(classes);
  this.instances = Object.freeze(instances);

  Object.freeze(this);
};
