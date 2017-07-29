Utils.processClassDeclaration = ({ otherClasses, templateElem }) => {
    let className;
    let classIsAbstract;
    let classExtends;

    let classProperties = Utils.createCleanObject();
    let classMethods = Utils.createCleanObject();

    let classConstructor;
    let classViewShape;

    let classHasExtensionPoint = false;

    // ooml-(abstract)?-class definitely exists as this function is only called via querySelectorAll
    Utils.iterate(templateElem.attributes, attribute => {
        switch (attribute.name) {
            case 'ooml-class':
            case 'ooml-abstract-class':
                if (className) {
                    throw new ReferenceError(`Duplicate class declaration attribute`);
                }

                let classDeclarationParts = /^([a-zA-Z][a-zA-Z.0-9]*)(?: extends ([a-zA-Z][a-zA-Z.0-9]*))?$/.exec(attribute.value);
                if (!classDeclarationParts) {
                    throw new SyntaxError(`Malformed attribute value for attribute "${ attribute.name }": "${ attribute.value }"`);
                }

                className = classDeclarationParts[1];
                classIsAbstract = attribute.name.indexOf('abstract') > -1;
                classExtends = classDeclarationParts[2] || undefined;
                break;

            default:
                throw new ReferenceError(`Unrecognised "${ attribute.name }" attribute on class declaration`);
        }
    });

    // Get all nodes in template to process
    let templateContent = OOMLCompatTemplateExists ?
        templateElem.content :
        templateElem;

    let classRawDom;

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

        if (classRootElem) {
            throw new SyntaxError(`The class "${ className }" has more than one root element`);
        }

        switch (node.nodeName) {
            case 'OOML-PROPERTY':

                let propName;
                let propTypes; // `undefined` as default
                let isSuppressed = false;
                let isArraySubstitution = false;
                let isInstanceSubstitution = false;
                let isAttribute = false;
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
                let dispatchEventHandlers = Utils.createCleanObject();

                let bindingConfig;

                Utils.iterate(node.attributes, attr => {
                    let domAttrName = attr.name;
                    let domAttrValue = attr.value;

                    switch (domAttrName) {
                        case 'name':
                            propName = domAttrValue;
                            break;

                        case 'type':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Invalid type declaration for attribute declared by ooml-property tag`);
                            }

                            propTypes = domAttrValue;
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
                            // TODO Check type is an OOML.Class, as can't have OOML.Array containing anything else
                            isArraySubstitution = true;
                            break;

                        case 'passthrough':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Invalid passthrough property name`);
                            }
                            passthroughPropName = domAttrValue;
                            break;

                        case 'get':
                            if (!Utils.isValidPropertyName(domAttrValue)) {
                                throw new SyntaxError(`Invalid ${ domAttrName } function`);
                            }

                            propGetter = domAttrValue;
                            break;

                        case 'set':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Invalid ${ domAttrName } function`);
                            }

                            propSetter = domAttrValue;
                            break;

                        case 'change':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Invalid ${ domAttrName } function`);
                            }

                            // TODO Can have change listener on OOML.Array
                            onchangeListener = domAttrValue;
                            break;

                        case 'bind-to':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Empty binding key`);
                            }

                            bindingConfig = Utils.parseBindingDeclaration(domAttrValue.trim());
                            propBindingIsDynamic = bindingConfig.isDynamic;
                            propBindingParts = bindingConfig.parts;
                            propBindingPropertyToPartMap = bindingConfig.propertyToPartMap;
                            propBindingKeypath = bindingConfig.keypath;
                            break;

                        case 'binding-exist':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Invalid ${ domAttrName } function`);
                            }

                            propBindingOnExist = domAttrValue;
                            break;

                        case 'binding-missing':
                            if (Utils.isNotOrBlankString(domAttrValue)) {
                                throw new SyntaxError(`Invalid ${ domAttrName } function`);
                            }

                            // storeValue needs to be available, even though it's always undefined
                            propBindingOnMissing = domAttrValue;
                            break;

                        default:
                            if (/^handle-/.test(domAttrName)) {

                                // Don't need to lowercase -- it already is
                                let eventName = domAttrName.slice(7);

                                if (dispatchEventHandlers[eventName]) {
                                    throw new ReferenceError(`Another "${ eventName }" dispatch event handler already exists`);
                                }

                                dispatchEventHandlers[eventName] = domAttrValue;

                            } else {
                                throw new ReferenceError(`Unrecognised attribute "${ domAttrName }" on ooml-property tag`);
                            }
                    }
                });

                if (!Utils.isValidPropertyName(propName)) {
                    throw new SyntaxError(`The property name "${ propName }" is invalid`);
                }

                if (isArraySubstitution) {
                    if (propGetter || propSetter) {
                        throw new SyntaxError(`The array property "${ propName }" has a getter or setter`);
                    }
                    if (bindingConfig) {
                        throw new SyntaxError(`The array property "${ propName }" has a binding`);
                    }
                } else if (isInstanceSubstitution) {

                } else {

                }
                // TODO START Process
                let elemConstructorName;
                let propName, passthroughPropName;

                if (Utils.isNotOrBlankString(elemConstructorName)) {
                    throw new SyntaxError(`"${ elemConstructorName }" is not a valid class`);
                }
                if (!Utils.isObjectLiteral(defaultValue) && !Array.isArray(defaultValue)) {
                    throw new TypeError(`Invalid default value for element substitution "${ propName }"`);
                }

                if (current.textContent.trim()) {
                    let defaultValue = Utils.getEvalValue(current.textContent);

                    classSubstitutionDefaultValues[propName] = defaultValue;
                }

                let elemConstructor =
                    elemConstructorName == 'OOML.Element' ? OOML.Element :
                        getClassFromString(elemConstructorName);

                if (passthroughPropName != undefined) {
                    if (elemConstructor == OOML.Element || elemConstructor[OOML_CLASS_PROPNAME_PROPNAMES].indexOf(passthroughPropName) == -1) {
                        throw new ReferenceError(`"${ passthroughPropName }" is not a valid passthrough property`);
                    }
                }
                // TODO END

                if (isSuppressed) {
                    if (propTypes) {
                        throw new SyntaxError(`The transient property "${ propName }" has types`);
                    }
                }

                if (classProperties[propName] || classMethods[propName]) {
                    throw new ReferenceError(`A property or method called "${ propName }" already exists`);
                }

                if (propTypes) {
                    propTypes = Utils.parseTypeDeclaration(propTypes);
                }

                let propValue = Utils.getEvalValue(node.textContent);
                if (!Utils.isPrimitiveValue(propValue) || (propTypes && !Utils.isType(propTypes, propValue))) {
                    throw new TypeError(`The value for the property "${ propName }" is invalid`);
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

                Utils.iterate(node.attributes, attr => {
                    let domAttrName = attr.name;
                    let domAttrValue = attr.value;
                    switch (domAttrName) {
                        case 'name':
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
                        throw new ReferenceError(`A constructor has already been defined for the class "${ className }"`);
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

    if (classRawDom) {
        if (classRawDom.nodeName == "OOML-EXTENSION-POINT") {
            throw new SyntaxError(`The extension point cannot be the root`);
        }
        let oomlExtensionPointElems = classRawDom.querySelectorAll("ooml-extension-point");
        if (oomlExtensionPointElems.length) {
            if (oomlExtensionPointElems.length > 1) {
                throw new ReferenceError(`A class has more than one extension point`);
            }
            let oomlExtensionPointElem = oomlExtensionPointElems[0];
            if (oomlExtensionPointElem.childNodes.length || oomlExtensionPointElem.attributes.length) {
                throw new SyntaxError(`ooml-extension-point tag has attributes or contents`);
            }
            classHasExtensionPoint = true;
            // Need to leave the element as is, so descendant classes can quickly substitute with their view
        }
    } else {
        // Non-abstract classes must have a DOM
        if (!classIsAbstract) {
            throw new SyntaxError(`The class "${ className }" does not have a root element`);
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

    // Keep this object flat; only "properties" and "methods" can be nested
    return Object.freeze({
        name: className,
        isAbstract: classIsAbstract,
        extends: classExtends,

        properties: Object.freeze(classProperties),
        methods: Object.freeze(classMethods),

        constructor: classConstructor,
        rawDom: classRawDom,
        // Don't really need to freeze, as shape is traversed, not directly accessed
        // Same as all other properties that are arrays or maps
        viewShape: classViewShape,
    });
};
