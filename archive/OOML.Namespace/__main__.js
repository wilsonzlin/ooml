OOML.Namespace = function (namespace, settings) {
  // For minifying, and to allow access from any scope
  let oomlNamespaceInstance = this;

  // Ensure `new` keyword was used
  if (!(oomlNamespaceInstance instanceof OOML.Namespace)) {
    throw SyntaxError(`OOML.Namespace must be constructed`);
  }

  // Default to document.body as namespace
  if (namespace === undefined) {
    namespace = document.body;

    // Find element matching selector, or used provided HTML
  } else if (Utils_typeOf(namespace, TYPEOF_STRING)) {
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
        throw ReferenceError(`Namespace DOM element not found using selector ${ namespaceSelector }`);
      }
    }

    // Otherwise, must provide an element
  } else if (!(namespace instanceof HTMLElement)) {
    throw TypeError(`Invalid namespace`);
  }
  // Mark this so future .hasAncestorOrDescendantNamespace checks can know this was used as a namespace
  namespace[OOML_DOM_PROPNAME_ISNAMESPACE] = true;

  // The `settings` variable is optional, but must be an object literal if provided
  if (settings === undefined) {
    settings = {};
  } else if (!Utils_isObjectLiteral(settings)) {
    throw TypeError(`Invalid settings object`);
  }

  // Prepare an object to store classes (parsed and imported); fill with global imports initially
  let classes = Utils_concat(OOMLGlobalImports);
  // To hold bootstrapped instances
  let instances = Utils_createCleanObject();

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
        if (!Utils_isObjectLiteral(settingValue)) {
          throw TypeError(`Invalid namespace imports`);
        }

        Object.keys(settingValue)
          .forEach(importName => {
            let importClass = settings.imports[importName];
            // It must be an OOML class (obviously)
            if (!Utils_isOOMLClass(importClass)) {
              throw TypeError(`The value for the import "${ importName }" is not an OOML class`);
            }
            classes[importName] = importClass;
          });

        break;

      default:
        throw ReferenceError(`"${ settingName }" is not a setting`);
      }
    });

  // Go through the namespace and find any OOML class declarations
  Utils_DOM_find(namespace, "template[ooml=class]")
    .forEach(classTemplateElem => {
      // See reference/classMetadata.js for reference
      let classMetadata = Utils_processClassDeclaration({
        otherClasses: classes,
        templateElem: classTemplateElem,
      });

      classes[classMetadata.name] = Utils_createOOMLClass({
        namespace: oomlNamespaceInstance,
        classMetadata: classMetadata,
      });
    });

  Utils_DOM_find(namespace, "[ooml-instantiate]")
    .forEach(instanceInstantiationElem => {

      let instDetails = instanceInstantiationElem.getAttribute("ooml-instantiate")
        .split(" ");
      let className = instDetails[0];
      let instanceName = instDetails[1];

      if (instances[instanceName]) {
        throw ReferenceError(`An object already exists with the name "${ instanceName }"`);
      }

      let initState = Utils_getEvalValue(instanceInstantiationElem.textContent);
      let constructor = classes[className];
      if (!constructor) {
        throw ReferenceError(`Unknown class "${ className }"`);
      }

      let classRootElemTagName = constructor[OOML_CLASS_PROPNAME_ROOTELEMTAGNAME];
      let instantiateElemTagName = instanceInstantiationElem.nodeName.toLocaleLowerCase();
      if (classRootElemTagName !== instantiateElemTagName) {
        throw ReferenceError(`Instantiating class "${ className }" requires tag "${ classRootElemTagName }", got "${ instantiateElemTagName }"`);
      }
      let instance = new constructor(initState);

      instanceInstantiationElem.parentNode.insertBefore(instance[OOML_INSTANCE_PROPNAME_DOMELEM], instanceInstantiationElem.nextSibling);

      // Copy attributes on instantiation element to new instance's root element
      Utils_iterate(instanceInstantiationElem.attributes, attr => {
        let domAttrName = attr.name.toLocaleLowerCase();
        let domAttrValue = attr.value;

        if (domAttrName != "ooml-instantiate") {
          if (/^(data|handle)-/.test(domAttrName)) {
            throw SyntaxError(`Illegal attribute "${ domAttrName }" on ooml-instantiate element`);
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
