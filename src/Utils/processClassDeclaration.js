Utils.processClassDeclaration = ({ otherClasses, templateElem }) => {
    let className;
    let classIsAbstract;
    let classParentName; // `undefined` default
    let classParent;

    let classProperties = Utils.createCleanObject();
    let classMethods = Utils.createCleanObject();
    let classExposeKeys = new StringSet();

    let classConstructor;
    let classViewShape;

    let classRawDom;
    let classViewShapePathToExtensionPoint; // `undefined` default

    // ooml-(abstract)?-class definitely exists as this function is only called via querySelectorAll
    // Don't need to check for duplicate attribute names
    Utils.iterate(templateElem.attributes, attribute => {
        let domAttrName = attribute.name;
        let domAttrValue = attribute.value;

        switch (domAttrName) {
            case 'ooml-class':
            case 'ooml-abstract-class':
                if (className) {
                    throw new ReferenceError(`Duplicate class declaration attribute`);
                }

                let classDeclarationParts = /^([a-zA-Z][a-zA-Z.0-9]*)(?: extends ([a-zA-Z][a-zA-Z.0-9]*))?$/.exec(domAttrValue);
                if (!classDeclarationParts) {
                    throw new SyntaxError(`Malformed attribute value for attribute "${ domAttrName }": "${ domAttrValue }"`);
                }

                className = classDeclarationParts[1];
                classIsAbstract = domAttrName.indexOf('abstract') > -1;
                classParentName = classDeclarationParts[2] || undefined;

                if (OOMLPrimitiveTypes.has(className)) {
                    throw new SyntaxError(`Class names cannot be called the same as a primitive type`);
                }
                break;

            default:
                throw new ReferenceError(`Unrecognised "${ domAttrName }" attribute on class declaration`);
        }
    });

    if (!className) {
        throw new SyntaxError(`Class declaration does not have a name`);
    }

    // Check that class name is unique
    if (otherClasses[className]) {
        throw new ReferenceError(`The class "${ className }" already exists`);
    }

    if (classParentName) {
        classParent = Utils.getClassFromString(otherClasses, classParentName);
    } else {
        classParent = OOML.Element;
    }

    // Get all nodes in template to process
    let templateContent = OOMLCompatTemplateExists ?
        templateElem.content :
        templateElem;

    let linkedMethods = [];

    Utils.iterate(templateContent.childNodes, node => {

        if (node instanceof Comment) {
            return;
        }

        if (node instanceof Text) {
            if (/\S/.test(node.data)) {
                throw new TypeError(`Illegal text node in class declaration with value "${node.data}"`);
            }
            return;
        }

        if (!(node instanceof Element)) {
            throw new TypeError(`Illegal top-level node in class declaration`);
        }

        if (classRawDom) {
            throw new SyntaxError(`The class "${ className }" has more than one root element`);
        }

        switch (node.nodeName) {
            case 'OOML-PROPERTY':

                let propName;
                let propTypes; // `undefined` as default
                let propTypesDeclaration; // `undefined` as default
                let propDefaultValue;

                let isSuppressed = false;
                let isAttribute = false;

                let isArraySubstitution = false;
                let isInstanceSubstitution = false;

                let dispatchEventHandlers = Utils.createCleanObject();
                let passthroughPropName;

                let propBindingParts;
                let propBindingPropertyToPartMap;
                let propBindingIsDynamic;
                let propBindingKeypath;
                let propBindingOnExist;
                let propBindingOnMissing;

                let propGetter;
                let propSetter;
                let onchangeListener;

                let bindingConfig;

                // Just to check for duplicates
                let attributeNames = new StringSet();

                // Process DOM attributes
                Utils.iterate(node.attributes, attr => {
                    let domAttrName = attr.name;
                    let domAttrValue = attr.value;

                    if (attributeNames.has(domAttrName)) {
                        throw new SyntaxError(`Duplicate "${ domAttrName }" declaration on ooml-property tag`);
                    }

                    switch (domAttrName) {
                        case 'name':
                            // Name will be checked after processing DOM attributes
                            propName = domAttrValue;
                            break;

                        case 'type':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Invalid type declaration for attribute declared by ooml-property tag`);
                            }

                            propTypesDeclaration = domAttrValue;
                            break;

                        case 'transient':
                            if (domAttrValue !== '') {
                                throw new SyntaxError(`Invalid "transient" value for attribute declared by ooml-property tag`);
                            }

                            isSuppressed = true;
                            break;

                        case 'attribute':
                            if (domAttrValue !== '') {
                                throw new SyntaxError(`Invalid "attribute" value for attribute declared by ooml-property tag`);
                            }

                            isAttribute = true;
                            break;

                        case 'array':
                            if (domAttrValue !== '') {
                                throw new SyntaxError(`Invalid "array" attribute value for element substitution property`);
                            }

                            isArraySubstitution = true;
                            break;

                        case 'passthrough':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Invalid passthrough property name`);
                            }
                            passthroughPropName = domAttrValue;
                            break;

                        case 'binding':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Empty binding key`);
                            }

                            bindingConfig = Utils.parseBindingDeclaration(domAttrValue.trim());
                            propBindingIsDynamic = bindingConfig.isDynamic;
                            propBindingParts = bindingConfig.parts;
                            // TODO Check that binding's dependent properties exist are are primitive or transitive
                            propBindingPropertyToPartMap = bindingConfig.propertyToPartMap;
                            propBindingKeypath = bindingConfig.keypath;
                            break;

                        case 'get':
                        case 'set':
                        case 'change':
                        case 'binding-exist':
                        case 'binding-missing':
                            if (!Utils.isValidPropertyName(domAttrValue)) {
                                throw new SyntaxError(`Invalid ${ domAttrName } method link`);
                            }

                            let methodName = Utils.parseMethodLinkingDeclaration(domAttrValue);
                            linkedMethods.push(methodName);

                            switch (domAttrName) {
                                case 'get':
                                    propGetter = methodName;
                                    break;

                                case 'set':
                                    propSetter = methodName;
                                    break;

                                case 'change':
                                    onchangeListener = methodName;
                                    break;

                                case 'binding-exist':
                                    propBindingOnExist = methodName;
                                    break;

                                case 'binding-missing':
                                    propBindingOnMissing = methodName;
                                    break;
                            }
                            break;

                        default:
                            if (/^handle-/.test(domAttrName)) {

                                // Don't need to lowercase -- it already is
                                // Don't need to check if already exists, because attributes are checked for duplicates
                                let eventName = domAttrName.slice(7);

                                let methodName = Utils.parseMethodLinkingDeclaration(domAttrValue);
                                linkedMethods.push(methodName);
                                dispatchEventHandlers[eventName] = methodName;

                            } else {
                                throw new ReferenceError(`Unrecognised attribute "${ domAttrName }" on ooml-property tag`);
                            }
                    }
                });

                // All properties must have a valid name
                if (!Utils.isValidPropertyName(propName)) {
                    throw new SyntaxError(`The property name "${ propName }" is invalid`);
                }

                if (classProperties[propName] || classMethods[propName]) {
                    throw new ReferenceError(`A property or method called "${ propName }" already exists`);
                }

                // Can't have binding handlers on a property that isn't bound to anything
                if ((propBindingOnMissing || propBindingOnExist) && !bindingConfig) {
                    throw new SyntaxError(`Binding missing/exist handler exists on unbound property`);
                }

                // getEvalValue will trim code
                propDefaultValue = Utils.getEvalValue(node.textContent);

                // Has type declaration
                if (propTypesDeclaration) {
                    // Transient properties may not have types
                    if (isSuppressed) {
                        throw new SyntaxError(`The transient property "${ propName }" has types`);
                    }

                    // Classes cannot have bars or the same name as a primitive type, so this is safe
                    let oomlClass =
                            propTypesDeclaration == 'OOML.Element' ? OOML.Element :
                                otherClasses[propTypesDeclaration];

                    // Type matches an OOML class, so it must be an array or instance substitution
                    if (oomlClass) {
                        if (isArraySubstitution) {
                            if (!Array.isArray(propDefaultValue)) {
                                throw new TypeError(`Invalid default value for array substitution "${ propName }"`);
                            }
                        } else {
                            if (propDefaultValue !== null && !Utils.isObjectLiteral(propDefaultValue)) {
                                throw new TypeError(`Invalid default value for instance substitution "${ propName }"`);
                            }
                            isInstanceSubstitution = true;
                        }
                        propTypes = oomlClass;

                    // Otherwise, it must be primitive type(s)
                    } else {
                        if (isArraySubstitution) {
                            throw new TypeError(`The array property "${ propName }" has a non-OOML class type`);
                        }
                        propTypes = Utils.parseTypeDeclaration(propTypesDeclaration);
                    }

                // Has no type declaration
                } else {
                    // Array properties must have at least, and at most, one OOML class as its type
                    if (isArraySubstitution) {
                        throw new TypeError(`The array property "${ propName }" has no type declaration`);
                    }
                }

                if (isArraySubstitution) {
                    if (propGetter || propSetter) {
                        throw new SyntaxError(`The array property "${ propName }" has a getter or setter`);
                    }
                    if (bindingConfig) {
                        throw new SyntaxError(`The array property "${ propName }" has a binding`);
                    }
                    if (isSuppressed) {
                        throw new SyntaxError(`The array property "${ propName }" is transient`);
                    }
                } else if (isInstanceSubstitution) {
                    if (bindingConfig) {
                        throw new SyntaxError(`The instance property "${ propName }" has a binding`);
                    }
                } else {
                    if (!Utils.isPrimitiveValue(propDefaultValue) || (propTypes && !Utils.isType(propTypes, propDefaultValue))) {
                        throw new TypeError(`The value for the property "${ propName }" is invalid`);
                    }
                    if (dispatchEventHandlers.length) {
                        throw new SyntaxError(`A primitive or transient property has handlers`);
                    }
                }

                if (passthroughPropName != undefined) {
                    if (!isInstanceSubstitution) {
                        throw new SyntaxError(`A non-instance property has a passthrough declaration`);
                    }

                    let oomlClass = propTypes;
                    if (oomlClass == OOML.Element || !oomlClass[OOML_CLASS_PROPNAME_PROPNAMES].has(passthroughPropName)) {
                        throw new ReferenceError(`"${ passthroughPropName }" is not a valid passthrough property`);
                    }
                }


                // Keep this object flat
                classProperties[propName] = Object.freeze({
                    bindingIsDynamic: propBindingIsDynamic,
                    bindingParts: propBindingParts,
                    bindingPropertyToPartMap: propBindingPropertyToPartMap,
                    bindingKeypath: propBindingKeypath,
                    bindingOnExist: propBindingOnExist,
                    bindingOnMissing: propBindingOnMissing,

                    types: propTypes,
                    defaultValue: propValue,

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

            case 'OOML-METHOD':

                let methodName;

                // Don't need to check for duplicates
                Utils.iterate(node.attributes, attr => {
                    let domAttrName = attr.name;
                    let domAttrValue = attr.value;

                    switch (domAttrName) {
                        case 'name':
                            if (methodName != undefined) {
                                throw new SyntaxError(`ooml-method tag has more than one name declaration`);
                            }

                            // Validity is checked after
                            methodName = domAttrValue;
                            break;

                        default:
                            throw new ReferenceError(`Unrecognised attribute "${ domAttrName }" on ooml-method tag`);
                    }
                });

                if (!Utils.isValidPropertyName(methodName)) {
                    throw new SyntaxError(`The method name "${ methodName }" is invalid`);
                }

                let textContent = node.textContent.trim();

                if (!/^function *\((?:[a-zA-Z_][a-zA-Z0-9_]*,)*(?:[a-zA-Z_][a-zA-Z0-9_]*)*\)\s*\{/.test(textContent) || !/\}$/.test(textContent)) {
                    throw new SyntaxError(`The "${ methodName }" method for the class "${ className }" is not a valid function declaration`);
                }

                let realFn = Utils.getEvalValue(textContent);

                // Abstract methods can also have constructors, as descendant classes can call it
                if (methodName == 'constructor') {
                    if (classConstructor) {
                        throw new ReferenceError(`Multiple constructors are defined for the class "${ className }"`);
                    }

                    classConstructor = realFn;

                } else {
                    if (classMethods[methodName] || classProperties[methodName]) {
                        throw new ReferenceError(`A method or property called "${ methodName }" already exists`);
                    }
                    Object.defineProperty(realFn, "name", { value: methodName });

                    // Keep this object flat
                    classMethods[methodName] = Object.freeze({
                        fn: realFn,
                    });
                }

                break;

            default:
                classRawDom = node;
        }
    });

    // TODO Inherit properties before checking methods

    // Check that methods linked to have been declared
    linkedMethods.forEach(methodName => {
        if (!classMethods[methodName]) {
            throw new ReferenceError(`The method "${ methodName }" is linked to, but has not been declared`);
        }
    });

    if (classRawDom) {
        if (classRawDom.nodeName == "OOML-EXTENSION-POINT") {
            throw new SyntaxError(`The extension point cannot be the root`);
        }
    } else {
        // Non-abstract classes must have a DOM
        if (!classIsAbstract) {
            throw new SyntaxError(`The class "${ className }" does not have a view`);
        }
    }

    // Remove the class declaration from the DOM
    if (templateElem.parentNode) {
        templateElem.parentNode.removeChild(templateElem);
    }

    // Prevent data-* attributes on the root element (as attribute properties should be used)
    Utils.iterate(classRawDom.attributes, attr => {
        if (/^data-/i.test(attr.name)) {
            throw new SyntaxError(`Data attributes are not allowed on the root element (class "${className}")`);
        }
    });

    if (classRawDom) {
        let realPathToExtensionPoint = {
            found: false,
        };
        // Since array and instance substitutions can only occur once per property, keep track of them
        let arrayOrInstanceSubstitutionsCount = Utils.createCleanObject();
        classViewShape = Utils.transformClassRawDomToViewShape(classProperties, classMethods, classRawDom, arrayOrInstanceSubstitutionsCount, classExposeKeys, [], realPathToExtensionPoint);
        classViewShapePathToExtensionPoint = realPathToExtensionPoint.path;
    }

    // Inherit shape
    if (classParent[OOML_CLASS_PROPNAME_EXTENSIONPOINT_PATH]) {
        let parentClassViewShape = classParent[OOML_CLASS_PROPNAME_VIEW_SHAPE];
        let extendedViewShape = Utils.deepClone(parentClassViewShape);

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
