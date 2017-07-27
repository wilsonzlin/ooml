OOML.Namespace = function(namespace, settings) {
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
        if (namespace[0] == '<') {
            let domParser = document.createElement('div');
            domParser.innerHTML = namespace;
            namespace = domParser;
        } else {
            namespace = document.querySelector(namespace);
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

    // Prepare an object to store imports; fill with global imports initially
    let imports = Utils.concat(OOMLGlobalImports);

    // Iterate settings object rather than directly accessing properties
    // to check for non-existent settings that have been provided
    Object.keys(settings).forEach(settingName => {
        let settingValue = settings[settingName];

        if (settingValue === undefined) {
            return;
        }

        switch (settingName) {
            case 'imports':
                // `imports` looks like `{ ImportName: Function OOML.Element, AnotherImportName: Function OOML.Element }`
                // Note that the import name does not have to be the actual name of the class
                if (!Utils.isObjectLiteral(settingValue)) {
                    throw new TypeError(`Invalid namespace imports`);
                }

                Object.keys(settingValue).forEach(importName => {
                    let importClass = settings.imports[importName];
                    // It must be an OOML class (obviously)
                    if (!Utils.isOOMLClass(importClass)) {
                        throw new TypeError(`The value for the import "${ importName }" is not an OOML class`);
                    }
                    imports[importName] = importClass;
                });

                break;

            default:
                throw new ReferenceError(`"${ settingName }" is not a setting`);
        }
    });

    // To hold parsed OOML classes
    let classes = Utils.createCleanObject();
    // To hold bootstrapped objects
    let objects = Utils.createCleanObject();

    // Go through the namespace and find any OOML class declarations
    Utils.DOM.find(namespace, 'template[ooml-class],template[ooml-abstract-class]').forEach(classTemplateElem => {

        /*
            This is a classMetadata object:

                {
                    name: "NameOfClass",
                    isAbstract: true || false,
                    extends: "a string representing the unverified name of the class, not a fuction representing the actual class",

                    constructor: Function unbindedConstructor || undefined,
                    rootElem: HTMLElement,

                    properties: {
                        nameOfProp: {
                            types: ["string", "natural", "null"] || [SomeOOMLClassConstructor] || undefined,
                            value: "the default value" || undefined,
                            isArray: true || false,

                            getter: Function someOwnMethod || undefined,
                            setter: Function someOwnMethod || undefined,
                            onChange: Function someOwnMethod || undefined,

                            isSuppressed: false,
                            isAttribute: true,

                            bindingIsDynamic: true || false,
                            bindingParts: ["users.", "", ".age"] || undefined,
                            bindingPropertyToPartMap: {
                                "userID": [1],
                            } || undefined,
                            bindingKeypath: undefined || "fixed.path.to.store.value",
                            bindingOnExist: Function someOwnMethod || undefined,
                            bindingOnMissing: Function someOwnMethod || undefined,
                        },
                    },
                    methods: {
                        nameOfMethod: {
                            fn: Function realFn,
                        },
                    },
                }


        */
        let classMetadata = Utils.processClassDeclarationMetadata(classTemplateElem);

        // Get name, and check that it is unique
        let className = classMetadata.name;
        if (classes[className]) {
            throw new ReferenceError(`The class "${ className }" already exists`);
        }

        let classExtends = classMetadata.extends;
        if (classExtends) {
            classExtends = Utils.getClassFromString(imports, classes, classExtends);
        } else {
            classExtends = OOML.Element;
        }

        // Used for applying default values on construction and extending a child class's predefined properties
        let classPredefinedProperties = Utils.deepFreeze(Utils.concat(Utils.deepClone(classExtends[OOML_CLASS_PROPNAME_PREDEFINEDPROPS]) || Utils.createCleanObject(), classMetadata.properties));

        // Will be frozen later
        let classProperties = Utils.deepClone(classPredefinedProperties);

        // Just for quick reference, nothing more
        let classArrayProperties = new StringSet();
        let classElementProperties = new StringSet();
        let classSubstitutionDefaultValues = Utils.createCleanObject();

        // For .toObject and .keys
        let classSuppressedProperties = new StringSet();

        Object.keys(classProperties).forEach(propName => {
            if (classProperties[propName].suppressed) {
                classSuppressedProperties.add(propName);
            }
        });

        let classMethods = classMetadata.methods;

        let classConstructor = classMetadata.constructor;

        let classHasExtensionPoint;

        let classRawDom = classMetadata.rootElem;
        if (classExtends[OOML_CLASS_PROPNAME_EXTENSIONPOINT]) {
            let parentClassRawDom = classExtends[OOML_CLASS_PROPNAME_EXTENSIONPOINT];
            let _extendedRawDom = parentClassRawDom.cloneNode(true);
            let extensionPoint = _extendedRawDom.querySelector('ooml-extension-point');
            if (!extensionPoint) {
                throw new Error(`Extension point element node not found on parent class`);
            }
            extensionPoint.parentNode.replaceChild(classRawDom, extensionPoint);
            classRawDom = _extendedRawDom;
        }

        let classRootElem = Utils.parseClassDom(classRawDom);

        Utils.deepFreeze(classProperties);
        let classPropertyNames = Object.freeze(Object.keys(classProperties));

        classes[className] = Utils.createOOMLClass(classMetadata);
    });

    Object.freeze(classes);

    Utils.DOM.find(namespace, '[ooml-instantiate]').forEach(instanceInstantiationElem => {

        let instDetails  = instanceInstantiationElem.getAttribute('ooml-instantiate').split(' '),
            className    = instDetails[0],
            instanceName = instDetails[1];

        if (objects[instanceName]) {
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
            let _attrName = attr.name.toLocaleLowerCase();
            if (_attrName != 'ooml-instantiate') {
                if (/^(data-|(mutation|dispatch|dom)?on)/.test(_attrName)) {
                    throw new SyntaxError(`Illegal attribute "${ _attrName }" on ooml-instantiate element`);
                }
                instance[OOML_INSTANCE_PROPNAME_DOMELEM].setAttribute(_attrName, attr.value);
            }
        });

        // Remove after attaching constructed elem
        instanceInstantiationElem.parentNode.removeChild(instanceInstantiationElem);

        objects[instanceName] = instance;
    });

    this.classes = classes;
    this.objects = objects;

    Object.freeze(this);
};
