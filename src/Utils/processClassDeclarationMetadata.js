Utils.processClassDeclarationMetadata = (templateElem) => {
    let className, classIsAbstract, classExtends;
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

    // Keep this object flat; only "properties" and "methods" can be nested
    let classMetadata = Object.preventExtensions({
        name: className,
        isAbstract: classIsAbstract,
        extends: classExtends,

        properties: Utils.createCleanObject(),
        methods: Utils.createCleanObject(),

        constructor: undefined,
        rootElem: undefined,
    });

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

        if (classMetadata.rootElem) {
            throw new SyntaxError(`The class "${ classMetadata.name }" has more than one root element`);
        }

        switch (node.nodeName) {
            case 'OOML-PROPERTY':

                let propName;
                let propTypes;
                let isSuppressed = false;
                let isAttribute = false;
                let propBindingParts;
                let propBindingPropertyToPartMap;
                let propBindingIsDynamic;
                let propBindingKeypath;
                let propBindingOnExist;
                let propBindingOnMissing;

                let propGetter, propSetter, onchangeListener;

                Utils.iterate(node.attributes, attr => {
                    let _attrName = attr.name;
                    let _attrVal = attr.value;

                    switch (_attrName) {
                        case 'name':
                            propName = _attrVal;
                            break;

                        case 'type':
                            if (Utils.isNotOrBlankString(_attrVal)) {
                                throw new SyntaxError(`Invalid type declaration for attribute declared by ooml-property tag`);
                            }
                            propTypes = _attrVal;
                            break;

                        case 'transient':
                            if (_attrVal !== '') {
                                throw new SyntaxError(`Invalid "transient" value for attribute declared by ooml-property tag`);
                            }
                            isSuppressed = true;
                            break;

                        case 'attribute':
                            if (_attrVal !== '') {
                                throw new SyntaxError(`Invalid "attribute" value for attribute declared by ooml-property tag`);
                            }
                            isAttribute = true;
                            break;

                        case 'get':
                            if (!Utils.isValidPropertyName(_attrVal)) {
                                throw new SyntaxError(`Invalid ${ _attrName } function`);
                            }

                            propGetter = _attrVal;
                            break;

                        case 'set':
                            if (Utils.isNotOrBlankString(_attrVal)) {
                                throw new SyntaxError(`Invalid ${ _attrName } function`);
                            }

                            propSetter = _attrVal;
                            break;

                        case 'change':
                            if (Utils.isNotOrBlankString(_attrVal)) {
                                throw new SyntaxError(`Invalid ${ _attrName } function`);
                            }

                            onchangeListener = Function('classes', 'property', 'value', 'initial', 'dispatch', `"use strict";${ _attrVal }`);
                            break;

                        case 'bind-to':
                            if (Utils.isNotOrBlankString(_attrVal)) {
                                throw new SyntaxError(`Invalid binding`);
                            }

                            let bindingConfig = Utils.parseBindingDeclaration(_attrVal.trim());
                            propBindingIsDynamic = bindingConfig.isDynamic;
                            propBindingParts = bindingConfig.parts;
                            propBindingPropertyToPartMap = bindingConfig.propertyToPartMap;
                            propBindingKeypath = bindingConfig.keypath;
                            break;

                        case 'binding-exist':
                            if (Utils.isNotOrBlankString(_attrVal)) {
                                throw new SyntaxError(`Invalid ${ _attrName } function`);
                            }

                            propBindingOnExist = Function('classes', 'property', 'storeValue', 'initial', 'dispatch', 'event', `"use strict";${ _attrVal }`);
                            break;

                        case 'binding-missing':
                            if (Utils.isNotOrBlankString(_attrVal)) {
                                throw new SyntaxError(`Invalid ${ _attrName } function`);
                            }

                            // storeValue needs to be available, even though it's always undefined
                            propBindingOnMissing = Function('classes', 'property', 'storeValue', 'initial', 'dispatch', 'event', `"use strict";${ _attrVal }`);
                            break;

                        default:
                            throw new ReferenceError(`Unrecognised attribute "${ _attrName }" on ooml-property tag`);
                    }
                });

                if (!Utils.isValidPropertyName(propName)) {
                    throw new SyntaxError(`The property name "${ propName }" is invalid`);
                }

                if (classMetadata.properties[propName] || classMetadata.methods[propName]) {
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
                classMetadata.properties[propName] = {
                    bindingIsDynamic: propBindingIsDynamic,
                    bindingParts: propBindingParts,
                    bindingPropertyToPartMap: propBindingPropertyToPartMap,
                    bindingKeypath: propBindingKeypath,
                    bindingOnExist: propBindingOnExist,
                    bindingOnMissing: propBindingOnMissing,
                    types: propTypes,
                    value: propValue,
                    isArray: false,
                    onChange: onchangeListener,
                    getter: propGetter,
                    setter: propSetter,
                    isSuppressed: isSuppressed,
                    isAttribute: isAttribute,
                };

                break;

            case 'OOML-METHOD':

                let methodName;

                Utils.iterate(node.attributes, attr => {
                    let attrVal = attr.value;
                    switch (attr.name) {
                        case 'name':
                            methodName = attrVal;
                            break;

                        default:
                            throw new ReferenceError(`Unrecognised attribute "${ attr.name }" on ooml-method tag`);
                    }
                });

                if (!Utils.isValidPropertyName(methodName)) {
                    throw new SyntaxError(`The method name "${ methodName }" is invalid`);
                }

                let textContent = node.textContent.trim();

                if (!/^function *\((?:[a-zA-Z_][a-zA-Z0-9_]*,)*(?:[a-zA-Z_][a-zA-Z0-9_]*)*\)\s*\{/.test(textContent) || !/\}$/.test(textContent)) {
                    throw new SyntaxError(`The "${ methodName }" method for the class "${ classMetadata.name }" is not a valid function declaration`);
                }

                let realFn = Utils.getEvalValue(textContent);

                // Abstract methods can also have constructors, as descendant classes can call it
                if (methodName == 'constructor') {
                    if (classMetadata.constructor) {
                        throw new ReferenceError(`A constructor has already been defined for the class "${ classMetadata.name }"`);
                    }

                    classMetadata.constructor = realFn;
                } else {
                    if (classMetadata.methods[methodName] || classMetadata.properties[methodName]) {
                        throw new ReferenceError(`A method or property called "${ methodName }" already exists`);
                    }
                    Object.defineProperty(realFn, "name", { value: methodName });

                    // Keep this object flat
                    classMetadata.methods[methodName] = {
                        fn: realFn,
                    };
                }

                break;

            default:
                classMetadata.rootElem = node;
        }
    });

    // Non-abstract classes must have a DOM
    if (!classMetadata.rootElem && !classMetadata.isAbstract) {
        throw new SyntaxError(`The class "${ classMetadata.name }" does not have a root element`);
    }

    // Remove the class declaration from the DOM
    if (templateElem.parentNode) {
        templateElem.parentNode.removeChild(templateElem);
    }

    // Prevent data-* attributes on the root element (as attribute properties should be used)
    Utils.iterate(classMetadata.rootElem.attributes, attr => {
        if (/^data-/i.test(attr.name)) {
            throw new SyntaxError(`Data attributes are not allowed on the root element (class "${classMetadata.name}")`);
        }
    });

    return classMetadata;
};
