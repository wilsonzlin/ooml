OOML.Namespace = function(namespace, settings) {

    if (!(this instanceof OOML.Namespace)) {
        throw new SyntaxError(`OOML.Namespace must be constructed`);
    }

    if (namespace === undefined) {
        namespace = document.body;
    } else if (Utils.typeOf(namespace, TYPEOF_STRING)) {
        namespace = namespace.trim();
        if (namespace[0] == '<') {
            let domParser = document.createElement('div');
            domParser.innerHTML = namespace;
            namespace = domParser;
        } else {
            namespace = document.querySelector(namespace);
        }
    } else if (!(namespace instanceof HTMLElement)) {
        throw new TypeError(`Invalid namespace`);
    }

    if (Utils.DOM.hasAncestorOrDescendantNamespace(namespace)) {
        throw new ReferenceError(`That namespace already exists`);
    }

    namespace[OOML_DOM_PROPNAME_ISNAMESPACE] = true;

    if (settings === undefined) {
        settings = {};
    } else if (!Utils.isObjectLiteral(settings)) {
        throw new TypeError(`Invalid settings object`);
    }

    let imports = Utils.concat(OOMLGlobalImports);
    let settingStrictPropertyNames = true;

    Object.keys(settings).forEach(settingName => {
        let settingValue = settings[settingName];

        if (settingValue === undefined) {
            return;
        }

        switch (settingName) {
            case 'imports':

                if (!Utils.isObjectLiteral(settingValue)) {
                    throw new TypeError(`Invalid namespace imports`);
                }

                Object.keys(settingValue).forEach(importName => {
                    let importClass = settings.imports[importName];
                    if (!Utils.isOOMLClass(importClass)) {
                        throw new TypeError(`The value for the import "${ importName }" is not an OOML class`);
                    }
                    imports[importName] = importClass;
                });

                break;

            case 'strictPropertyNames':

                if (!Utils.typeOf(settingValue, TYPEOF_BOOLEAN)) {
                    throw new TypeError(`Invalid setting value for "strictPropertyNames"`);
                }

                settingStrictPropertyNames = settingValue;

                break;

            default:
                throw new ReferenceError(`"${ settingName }" is not a setting`);
        }
    });

    let classes = Utils.createCleanObject();
    let objects = Utils.createCleanObject();

    function getClassFromString(className) {
        if (classes[className]) {
            return classes[className];
        }

        let ret = imports[className];

        if (!Utils.isOOMLClass(ret)) {
            throw new ReferenceError(`The class "${ className }" does not exist`);
        }

        return ret;
    }

    Utils.DOM.find(namespace, 'template[ooml-class],template[ooml-abstract-class]').forEach(classTemplateElem => {

        /*
            This is an object literal:

                {
                    name: "NameOfClass",
                    isAbstract: true || false,
                    extends: "a string representing the unverified name of the class, not a fuction representing the actual class",

                    attributes: {
                        nameOfAttr: {
                            value: "the default value",
                        },
                    },
                    properties: {
                        nameOfProp: {
                            types: ["string", "natural", "null"] || [SomeOOMLClassConstructor] || undefined,
                            value: "the default value" || undefined,
                            isArray: true || false,
                        },
                    },
                    methods: {
                        nameOfMethod: {
                            fn: Function wrapperFunc,
                        },
                    },

                    constructor: Function unbindedConstructor || undefined,
                    rootElem: HTMLElement,
                }


        */
        let classMetadata = Utils.preprocessClassDeclaration(classTemplateElem, settingStrictPropertyNames);

        Utils.iterate(classMetadata.attributes, attr => {
            if (/^data-/i.test(attr.name)) {
                throw new SyntaxError(`Data attributes are not allowed on the root element`);
            }
        });

        let className = classMetadata.name;
        if (classes[className]) {
            throw new ReferenceError(`The class "${ className }" already exists`);
        }

        let classIsAbstract = classMetadata.isAbstract;

        let classExtends = classMetadata.extends;
        let classExtendsDefault = !classExtends;
        if (classExtends) {
            classExtends = getClassFromString(classExtends);
        } else {
            classExtends = OOML.Element;
        }

        // Used for applying default values on construction and extending a child class's predefined properties
        var classPredefinedProperties = Utils.deepFreeze(Utils.concat(Utils.clone(classExtends[OOML_CLASS_PROPNAME_PREDEFINEDPROPS]) || Utils.createCleanObject(), classMetadata.properties));

        // Will be frozen later
        var classProperties = Utils.clone(classPredefinedProperties);

        // Just for quick reference, nothing more
        var classArrayProperties = new StringSet();
        var classElementProperties = new StringSet();
        var classSubstitutionDefaultValues = Utils.createCleanObject();

        // For .toObject
        var classSuppressedProperties = new StringSet();

        Object.keys(classProperties).forEach(propName => {
            if (classProperties[propName].suppressed) {
                classSuppressedProperties.add(propName);
            }
        });

        var classAttributes = Utils.deepFreeze(Utils.concat(Utils.clone(classExtends[OOML_CLASS_PROPNAME_PREDEFINEDATTRS]) || Utils.createCleanObject(), classMetadata.attributes));

        var classMethods = classMetadata.methods;

        var parentClassConstructor = classExtends[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR];
        var classConstructor;
        if (classExtendsDefault) {
            classConstructor = classMetadata.constructor || function() {};
        } else {
            classConstructor = classMetadata.constructor ? classMetadata.constructor.bind(undefined, parentClassConstructor) : parentClassConstructor;
        }

        function parseClassDomTextSubstitution(code) {
            let regexpMatches = /^(?: ((?:(?:[a-zA-Z.]+)\|)*[a-zA-Z.]+))? (@)?this\.(attributes\.)?(.+?) $/.exec(code);
            if (!regexpMatches || !regexpMatches[4]) {
                // .slice to prevent super-long messages
                throw new SyntaxError(`Invalid property declaration at "${ code.slice(0, 200) }"`);
            }

            let types = regexpMatches[1] || undefined;
            let propName = regexpMatches[4];
            let isAttribute = !!regexpMatches[3];
            let isSuppressed = !!regexpMatches[2];

            if (isAttribute) {
                if (isSuppressed) {
                    throw new TypeError(`Attributes cannot be suppressed`);
                }

                if (!Utils.isValidAttributeName(propName)) {
                    throw new SyntaxError(`"${ propName }" is not a valid attribute name`);
                }

                if (!classAttributes[propName]) {
                    throw new ReferenceError(`The attribute "${ propName }" does not exist`);
                }

                if (types && (!classProperties[propName].types || classAttributes[propName].types.join('|') !== types)) {
                    throw new SyntaxError(`Invalid type declaration for the attribute substitution "${ propName }"`);
                }
            } else {
                if (!Utils.isValidPropertyName(propName, settingStrictPropertyNames)) {
                    throw new SyntaxError(`"${ propName }" is not a valid property name`);
                }

                if (classMethods[propName]) {
                    throw new ReferenceError(`"${ propName }" already exists as a method`);
                }

                if (classElementProperties.has(propName) || classArrayProperties.has(propName)) {
                    throw new ReferenceError(`The property "${ propName }" already exists as a element substitution`);
                }

                let propAlreadyExists = !!classProperties[propName];

                if (propAlreadyExists) {
                    if (isSuppressed && !classProperties[propName].suppressed) {
                        classProperties[propName].suppressed = true;
                        classSuppressedProperties.add(propName);
                    }

                    if (types) {
                        if (classProperties[propName].types) {
                            if (classProperties[propName].types.join('|') !== types) {
                                throw new ReferenceError(`The types for the property "${ propName }" have already been declared`);
                            }
                        } else {
                            classProperties[propName].types = Utils.parseTypeDeclaration(types);
                        }
                    }
                } else {
                    classProperties[propName] = {
                        // types is undefined if not matched in RegExp
                        types: types && Utils.parseTypeDeclaration(types),
                        isArray: false,
                        value: undefined,
                        suppressed: isSuppressed,
                    };
                    if (isSuppressed) {
                        classSuppressedProperties.add(propName);
                    }
                }
            }

            return {
                isAttribute: isAttribute,
                name: propName,
            };
        }

        var classExtensionPointPath;

        var classRootElem = (function parseClassDom(current, currentPath) {

            let ret;

            if (current instanceof Element) {

                let elemName = current.nodeName.toLocaleLowerCase();

                if (elemName == 'ooml-substitution') {
                    let elemConstructorName;
                    let propName;
                    let isArraySubstitution = false;
                    let isSuppressed = false;

                    let getter, setter;

                    let dispatchEventHandlers = Utils.createCleanObject();

                    Utils.iterate(current.attributes, _attr => {
                        let _attrName = _attr.name.toLocaleLowerCase();
                        let _attrVal = _attr.value;

                        switch (_attrName) {
                            case 'property':
                                propName = _attrVal;
                                break;

                            case 'class':
                                elemConstructorName = _attrVal;
                                break;

                            case 'suppressed':
                                if (_attrVal !== '') {
                                    throw new SyntaxError(`Invalid "suppressed" attribute value for element substitution property`);
                                }
                                isSuppressed = true;
                                break;

                            case 'array':
                                if (_attrVal !== '') {
                                    throw new SyntaxError(`Invalid "array" attribute value for element substitution property`);
                                }
                                isArraySubstitution = true;
                                break;

                            case 'get':
                                if (Utils.isNotOrBlankString(_attrVal)) {
                                    throw new SyntaxError(`Invalid ${ _attrName } function`);
                                }

                                getter = Function('classes', 'property', 'currentValue', `"use strict";${ _attrVal }`);
                                break;

                            case 'set':
                                if (Utils.isNotOrBlankString(_attrVal)) {
                                    throw new SyntaxError(`Invalid ${ _attrName } function`);
                                }

                                setter = Function('classes', 'property', 'currentValue', 'newValue', `"use strict";${ _attrVal }`);
                                break;

                            default:
                                if (/^dispatchon/.test(_attrName)) {

                                    // Don't need to lowercase -- it already is
                                    let eventName = _attrName.slice(10);

                                    if (dispatchEventHandlers[eventName]) {
                                        throw new ReferenceError(`Another child "${ eventName }" event handler already exists`);
                                    }

                                    dispatchEventHandlers[eventName] = Function('dispatch', 'classes', 'data', `"use strict";${ _attrVal }`);

                                } else {
                                    throw new SyntaxError(`Unknown attribute "${ _attrName }" on element substitution property declaration`);
                                }
                        }
                    });

                    if (Utils.isNotOrBlankString(elemConstructorName)) {
                        throw new SyntaxError(`"${ elemConstructorName }" is not a valid class`);
                    }

                    if (!Utils.isValidPropertyName(propName)) {
                        throw new SyntaxError(`"${ propName }" is not a valid property name`);
                    }

                    if (classMethods[propName]) {
                        throw new ReferenceError(`"${ propName }" already exists as a method`);
                    }

                    if (classProperties[propName]) {
                        // Cannot be predefined, or be some other substitution
                        throw new ReferenceError(`The property "${ propName }" is already defined`);
                    }

                    if (current.textContent.trim()) {
                        let defaultValue = Utils.getEvalValue(current.textContent);
                        if (!Utils.isObjectLiteral(defaultValue) && !Array.isArray(defaultValue)) {
                            throw new TypeError(`Invalid default value for element substitution "${ propName }"`);
                        }

                        classSubstitutionDefaultValues[propName] = defaultValue;
                    }

                    if (isSuppressed) {
                        classSuppressedProperties.add(propName);
                    }

                    if (isArraySubstitution) {
                        classArrayProperties.add(propName);
                    } else {
                        classElementProperties.add(propName);
                    }

                    let elemConstructor =
                        elemConstructorName == 'OOML.Element' ? OOML.Element :
                            getClassFromString(elemConstructorName);


                    classProperties[propName] = {
                        types: [elemConstructor],
                        isArray: isArraySubstitution,
                        value: undefined,
                        suppressed: isSuppressed,
                        dispatchEventHandlers: dispatchEventHandlers,
                        getter: getter,
                        setter: setter,
                    };

                    // WARNING: Code returns here -- DOES NOT PROCEED
                    return {
                        type: 'comment',
                        value: '',
                        bindedProperty: propName,
                    };
                }

                if (elemName == 'ooml-extension-point') {
                    if (classExtensionPointPath) {
                        throw new ReferenceError(`An extension point already exists`);
                    }
                    if (!currentPath.length) {
                        throw new SyntaxError(`The extension point cannot be the root`);
                    }
                    classExtensionPointPath = currentPath;

                    // WARNING: Code returns here -- DOES NOT PROCEED
                    return {
                        type: 'extensionPoint',
                    }
                }

                if (/^ooml-(table|thead|tbody|tfoot|tr|th|td)$/.test(elemName)) {
                    elemName = elemName.slice(5);
                }

                ret = {
                    type: 'element',
                    name: elemName,
                    domEventHandlers: Utils.createCleanObject(),
                    attributes: [],
                    childNodes: [],
                };

                let attrNames = new StringSet();

                Utils.iterate(current.attributes, attr => {

                    let attrName = attr.name.toLocaleLowerCase();

                    if (attrNames.has(attrName)) {
                        throw new ReferenceError(`Duplicate attribute "${ attrName }"`);
                    }
                    attrNames.add(attrName);

                    if (/^domon/.test(attrName)) {

                        // Don't need to lowercase -- it already is
                        let eventName = attrName.slice(5);

                        if (ret.domEventHandlers[eventName]) {
                            throw new ReferenceError(`Another DOM "${ eventName }" event handler already exists`);
                        }

                        ret.domEventHandlers[eventName] = Function('$self', 'dispatch', 'classes', 'event', `"use strict";${ attr.value }`);

                    } else if (/^on/.test(attrName)) {

                        throw new TypeError(`Native DOM event handlers are not allowed`);

                    } else {

                        ret.attributes.push(parseClassDom(attr));

                    }
                });

                Utils.iterate(current.childNodes, childNode => {
                    // Paths are only used for elements, so the next part can only be the next index
                    let parsedChildNodes = parseClassDom(childNode, currentPath.concat(ret.childNodes.length));
                    if (Array.isArray(parsedChildNodes)) {
                        Array.prototype.push.apply(ret.childNodes, parsedChildNodes);
                    } else {
                        ret.childNodes.push(parsedChildNodes);
                    }
                });

            } else if (current instanceof Text) {

                ret = [];

                let nodeValue = current.data;
                let indexOfOpeningBrace;

                while ((indexOfOpeningBrace = nodeValue.indexOf('{{')) > -1) {

                    let textBeforeParam = nodeValue.slice(0, indexOfOpeningBrace);
                    if (textBeforeParam) {
                        ret.push({
                            type: 'text',
                            value: textBeforeParam,
                        });
                    }

                    nodeValue = nodeValue.slice(indexOfOpeningBrace);

                    // currentNode.nodeValue is now:
                    // "{{ this.propName }}"
                    // Therefore the index of the closing brace can't be less than 10
                    let indexOfClosingBrace = nodeValue.indexOf('}}');
                    if (indexOfClosingBrace < 10) {
                        throw new SyntaxError(`Matching closing brace not found`);
                    }
                    // Remove opening and closing braces:
                    // "{{ this.propName }}"         becomes " this.propName "
                    let code = nodeValue.slice(2, indexOfClosingBrace);

                    let textSubstitutionConfig = parseClassDomTextSubstitution(code);

                    ret.push({
                        type: 'text',
                        value: '',
                        bindedProperty: textSubstitutionConfig.isAttribute ? undefined : textSubstitutionConfig.name,
                        bindedAttribute: !textSubstitutionConfig.isAttribute ? undefined : textSubstitutionConfig.name,
                    });

                    nodeValue = nodeValue.slice(indexOfClosingBrace + 2);
                }

                // Push any remaining text
                if (nodeValue) {
                    ret.push({
                        type: 'text',
                        value: nodeValue,
                    });
                }

            } else if (current instanceof Comment) {

                ret = {
                    type: 'comment',
                    value: current.value,
                };

            } else if (current instanceof Attr) {

                let nodeName = current.name;
                if (nodeName == 'ooml-style') {
                    // IE discards invalid style attributes (and ones with OOML bindings count as invalid), so allow alternative syntax
                    nodeName = nodeName.slice(5);
                }
                let nodeValue = current.value;

                ret = {
                    type: 'attribute',
                    name: nodeName,
                    value: nodeValue,
                };

                if (nodeValue.indexOf('{{') > -1) {
                    let strParts = [];
                    let paramMap = Utils.createCleanObject();
                    let str = nodeValue;

                    paramMap.attributes = Utils.createCleanObject();

                    while (true) {
                        let posOfOpeningBraces = str.indexOf('{{');

                        if (posOfOpeningBraces < 0) {
                            if (str) {
                                strParts.push(str);
                            }
                            break;
                        }

                        let strBeforeParam = str.slice(0, posOfOpeningBraces);
                        if (strBeforeParam) {
                            strParts.push(strBeforeParam);
                        }
                        str = str.slice(posOfOpeningBraces + 2);

                        let posOfClosingBraces = str.indexOf('}}');
                        if (posOfClosingBraces < 0) {
                            throw new SyntaxError(`Unexpected end of input; expected closing text parameter braces`);
                        }

                        let code = str.slice(0, posOfClosingBraces);

                        let textSubstitutionConfig = parseClassDomTextSubstitution(code);
                        let param = textSubstitutionConfig.name;

                        let mapToUse = textSubstitutionConfig.isAttribute ? paramMap.attributes : paramMap;

                        if (!mapToUse[param]) {
                            mapToUse[param] = [];
                        }
                        mapToUse[param].push(strParts.length);
                        strParts.push('');

                        str = str.slice(posOfClosingBraces + 2);
                    }

                    ret.valueFormat = strParts;
                    ret.valueFormatMap = paramMap;
                }
            }

            return ret;
        })(classMetadata.rootElem, []);

        if (classExtensionPointPath) {
            console.log(classExtensionPointPath, classRootElem);
            throw 1;
        }

        Utils.deepFreeze(classProperties);
        var classPropertyNames = Object.freeze(Object.keys(classProperties));

        classes[className] = function(initState) {
            let instance = this;
            let instanceIsAttachedTo;

            if (!(instance instanceof classes[className])) {
                throw new ReferenceError(`OOML instances need to be constructed`);
            }

            if (initState !== undefined && !Utils.isObjectLiteral(initState)) {
                if (!Utils.typeOf(instance.unserialise, TYPEOF_FUNCTION) || !Utils.isPrimitiveValue(initState)) {
                    throw new TypeError(`Invalid OOML instance initial state`);
                }

                initState = instance.unserialise(initState);
                if (!Utils.isObjectLiteral(initState)) {
                    throw new TypeError(`Unserialised initial state is not an object`);
                }
            }

            if (classIsAbstract) {
                if (!Utils.typeOf(instance.abstractFactory, TYPEOF_FUNCTION)) {
                    throw new TypeError(`Unable to construct new instance; "${ classMetadata.name }" is an abstract class`);
                }

                let ret = instance.abstractFactory(initState, classes);
                if (!(ret instanceof OOML.Element)) {
                    throw new TypeError(`Abstract factory returned value is not an OOML instance`);
                }

                return ret;
            }

            function dispatchEventToParent(eventName, eventData) {

                if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
                    throw new TypeError(`Event name isn't a string`);
                }

                let prevented = false;
                eventName = eventName.toLocaleLowerCase();

                if (instanceEventHandlers.dispatch[eventName]) {
                    instanceEventHandlers.dispatch[eventName].forEach(handler => {
                        let eventObject = {
                            preventDefault: () => { prevented = true },
                            data: eventData,
                        };

                        let returnValue = handler.call(instance, eventObject);

                        if (returnValue === false) {
                            prevented = true;
                        }
                    });
                }

                if (!prevented && instanceIsAttachedTo) {
                    instanceIsAttachedTo.parent[OOML_INSTANCE_PROPNAME_DISPATCH](instanceIsAttachedTo.property, eventName, eventData);
                }

            }

            let instanceProperties = Utils.clone(classProperties);
            Object.keys(instanceProperties).forEach(propertyName => {
                instanceProperties[propertyName].insertAfter = undefined;
                instanceProperties[propertyName].nodes = new NodeSet(); // Use NodeSet as attributes may be binded to the same property more than once
            });

            let instanceAttributes = Utils.clone(classAttributes);
            let instanceAttributesInterface = Utils.createCleanObject();

            // Must be before instanceDom initialisation as processClassDom uses instanceAttributes[attrName].nodes
            Object.keys(instanceAttributes).forEach(attrName => {
                // Use set as one DOM attribute can refer to one attribute more than once
                instanceAttributes[attrName].nodes = new NodeSet();

                // Set up attributes interface object
                Object.defineProperty(instanceAttributesInterface, attrName, {
                    get: () => instanceAttributes[attrName].value,
                    set: newVal => {
                        if (newVal === undefined) {
                            throw new TypeError(`The value for the attribute "${ attrName }" is invalid`);
                        }

                        if (instanceAttributes[attrName].types) {
                            if (!Utils.isType(instanceAttributes[attrName].types, newVal)) {
                                throw new TypeError(`Cannot set new attribute value for "${ attrName }"; expected type to be one of: ${ instanceAttributes[attrName].types.join(', ') }`);
                            }
                        }

                        Utils.DOM.writeValue('attribute', attrName, instanceAttributes[attrName].nodes, newVal);

                        instanceAttributes[attrName].value = newVal;
                        Utils.DOM.setData(instanceDom, attrName, newVal);
                    },
                    enumerable: true,
                });
            });
            Object.preventExtensions(instanceAttributesInterface);

            let instanceEventHandlers = {
                mutation: Utils.createCleanObject(),
                dispatch: Utils.createCleanObject(),
            };

            let instanceExposedDOMElems = Utils.createCleanObject(); // { "key": HTMLElement }
            let instanceDom = (function processClassDom(node) {

                let cloned;

                switch (node.type) {
                    case 'element':

                        cloned = document.createElement(node.name);

                        Object.keys(node.domEventHandlers).forEach(eventName => {

                            // Event object will be provided when called by browser
                            cloned['on' + eventName] = node.domEventHandlers[eventName].bind(instance, cloned, dispatchEventToParent, classes);

                        });

                        node.attributes.forEach(attr => {
                            if (attr.name == 'ooml-expose') {
                                let exposeKey = attr.value;
                                if (instanceExposedDOMElems[exposeKey]) {
                                    throw new ReferenceError(`A DOM element is already exposed with the key "${ exposeKey }"`);
                                }
                                instanceExposedDOMElems[exposeKey] = cloned;
                            } else {
                                if (!attr.valueFormat) {
                                    cloned.setAttribute(attr.name, attr.value);
                                } else {
                                    // COMPATIBILITY - IE: Don't use .(get|set)Attribute(Node)? -- buggy behaviour in IE
                                    let clonedAttr = {
                                        name: attr.name,
                                        valueFormat: attr.valueFormat.slice(),
                                        valueFormatMap: attr.valueFormatMap,
                                        ownerElement: cloned,
                                    };

                                    Object.keys(attr.valueFormatMap).forEach(propertyName => {
                                        if (propertyName != 'attributes') {
                                            instanceProperties[propertyName].nodes.add(clonedAttr);
                                        }
                                    });

                                    Object.keys(attr.valueFormatMap.attributes).forEach(attrName => {
                                        instanceAttributes[attrName].nodes.add(clonedAttr);
                                    });
                                }
                            }
                        });

                        node.childNodes.forEach(childNode => {
                            cloned.appendChild(processClassDom(childNode));
                        });

                        break;

                    case 'text':

                        cloned = document.createTextNode(node.value);

                        if (node.bindedProperty) {
                            let propertyName = node.bindedProperty;
                            instanceProperties[propertyName].nodes.add(cloned);
                        }

                        if (node.bindedAttribute) {
                            instanceAttributes[node.bindedAttribute].nodes.add(cloned);
                        }

                        break;

                    case 'comment':

                        cloned = document.createComment(node.value);

                        if (node.bindedProperty) {

                            let propertyName = node.bindedProperty;

                            instanceProperties[propertyName].insertAfter = cloned;
                            if (instanceProperties[propertyName].isArray) {
                                instanceProperties[propertyName].value = new OOML.Array(instanceProperties[propertyName].types[0], cloned, instance, propertyName);
                            }

                        }

                        break;

                    default:

                        throw new Error(`Invalid class DOM node type to process`);

                }

                return cloned;
            })(classRootElem);

            // Must be done after instanceDom and instanceAttributesInterface is initialised
            Object.keys(instanceAttributes).forEach(attrName => {
                // Set initial attribute value
                instanceAttributesInterface[attrName] = instanceAttributes[attrName].value;
            });

            let propertiesGetterSetterFuncs = Utils.createCleanObject();
            propertiesGetterSetterFuncs.attributes = {
                set: newObj => {
                    if (!Utils.isObjectLiteral(newObj)) {
                        throw new TypeError(`New attributes object provided is not a valid object`);
                    }

                    let newObjKeys = Object.keys(newObj);

                    // Don't combine checking if attribute exists and setting it,
                    // as that may result in a half-state where some attributes
                    // are set and some aren't
                    newObjKeys.forEach(attrName => {
                        if (!instanceAttributes[attrName]) {
                            throw new ReferenceError(`New attributes object provided has an unrecognised attribute "${ attrName }"`);
                        }
                    });

                    newObjKeys.forEach(attrName => {
                        instanceAttributesInterface[attrName] = newObj[attrName];
                    });
                },
                get: () => instanceAttributesInterface,
            };
            propertiesGetterSetterFuncs.on = {
                value: Object.freeze(Utils.concat.apply(undefined, Object.keys(instanceEventHandlers).map(eventType => {
                    let ret = Utils.createCleanObject();
                    ret[eventType] = (eventName, handler) => {
                        if (!Utils.typeOf(handler, TYPEOF_FUNCTION)) {
                            throw new TypeError(`The handler for the event "${ eventName }" of type "${ eventType }" is not a function`);
                        }

                        if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
                            throw new TypeError(`Event name is not a string`);
                        }

                        eventName = eventName.toLocaleLowerCase();

                        if (!instanceEventHandlers[eventType][eventName]) {
                            instanceEventHandlers[eventType][eventName] = [];
                        }
                        instanceEventHandlers[eventType][eventName].push(handler);
                        return instance;
                    };
                    return ret;
                }))),
            };
            propertiesGetterSetterFuncs.detach = {
                value: () => {
                    if (!instanceIsAttachedTo) {
                        throw new ReferenceError(`This instance is not in use`);
                    }

                    let parent = instanceIsAttachedTo.parent;

                    if (parent instanceof OOML.Array) {
                        let indexOfThis = parent.indexOf(instance);
                        if (indexOfThis < 0) {
                            throw new Error(`This instance could not be found on its parent array`);
                        }
                        // This will call __oomlDetach
                        parent.splice(indexOfThis, 1);
                    } else if (parent instanceof OOML.Element) {
                        // This will call __oomlDetach
                        parent[instanceIsAttachedTo.property] = null;
                    } else {
                        throw new Error(`Unrecognised parent`);
                    }

                    return instance;
                },
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_DOMELEM] = {
                value: instanceDom,
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_ATTACH] = {
                value: settings => {
                    if (instanceIsAttachedTo) {
                        throw new ReferenceError(`This instance is already in use`);
                    }

                    instanceIsAttachedTo = {
                        parent: settings.parent,
                        property: settings.property,
                    };

                    settings.insertAfter.parentNode.insertBefore(instanceDom, settings.insertAfter.nextSibling);
                },
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_DETACH] = {
                value: () => {
                    if (!instanceIsAttachedTo) {
                        throw new Error(`This instance is not in use`);
                    }

                    instanceIsAttachedTo = undefined;

                    instanceDom.parentNode.removeChild(instanceDom);
                },
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_DISPATCH] = {
                value: (propName, eventName, data) => {
                    if (classProperties[propName].dispatchEventHandlers[eventName]) {
                        classProperties[propName].dispatchEventHandlers[eventName].call(instance, dispatchEventToParent, classes, data);
                    }
                },
            };

            classPropertyNames.forEach(prop => {

                let setter;

                if (classArrayProperties.has(prop)) {

                    // Element array substitution
                    setter = newVal => {
                        if (!Array.isArray(newVal)) {
                            throw new TypeError(`Non-array provided to element array substitution property`);
                        }
                        instanceProperties[prop].value.initialize(newVal);
                    };

                } else if (classElementProperties.has(prop)) {

                    // Element substitution
                    setter = newVal => {
                        // Let constructors handle newVal's type
                        if (newVal === undefined) {
                            throw new TypeError(`Undefined provided as element substitution property value`);
                        }

                        let elemDetails = instanceProperties[prop];

                        let currentValue = instanceProperties[prop].value;

                        if (classProperties[prop].setter) {
                            let setterReturnVal = classProperties[prop].setter.call(instance, classes, prop, currentValue, newVal);
                            if (setterReturnVal === false) {
                                return;
                            }

                            if (setterReturnVal !== undefined) {
                                if (!Utils.isObjectLiteral(setterReturnVal)) {
                                    throw new TypeError(`Invalid setter return value`);
                                }

                                if (Utils.hasOwnProperty(setterReturnVal, 'value')) {
                                    newVal = setterReturnVal.value;
                                }
                            }
                        }

                        // Attach first to ensure that element is attachable
                        if (newVal !== null) {
                            newVal = Utils.constructElement(elemDetails.types[0], newVal);
                            newVal[OOML_INSTANCE_PROPNAME_ATTACH]({
                                insertAfter: elemDetails.insertAfter,
                                parent: instance,
                                property: prop
                            });
                        }

                        // Current element may be null and therefore does not need detaching
                        if (currentValue instanceof OOML.Element) {
                            currentValue[OOML_INSTANCE_PROPNAME_DETACH]();
                        }

                        instanceProperties[prop].value = newVal;
                    };

                } else {

                    setter = newVal => {
                        if (newVal === undefined) {
                            throw new TypeError(`Undefined provided as property value`);
                        }

                        let customHtml;
                        let oldVal = instanceProperties[prop].value;

                        if (classProperties[prop].setter) {
                            let setterReturnVal = classProperties[prop].setter.call(instance, classes, prop, oldVal, newVal);
                            if (setterReturnVal === false) {
                                return;
                            }

                            if (setterReturnVal !== undefined) {
                                if (!Utils.isObjectLiteral(setterReturnVal)) {
                                    throw new TypeError(`Invalid setter return value`);
                                }

                                if (Utils.hasOwnProperty(setterReturnVal, 'value')) {
                                    newVal = setterReturnVal.value;
                                }

                                if (Utils.hasOwnProperty(setterReturnVal, 'HTML')) {
                                    customHtml = setterReturnVal.HTML;
                                }
                            }
                        }

                        if (!Utils.isPrimitiveValue(newVal)) {
                            throw new TypeError(`Cannot set new property value for "${ prop }"; unrecognised type`);
                        }

                        if (instanceProperties[prop].types) {
                            if (!Utils.isType(instanceProperties[prop].types, newVal)) {
                                throw new TypeError(`Cannot set new property value for "${ prop }"; expected type to be one of: ${ instanceProperties[prop].types.join(', ') }`);
                            }
                        }

                        Utils.DOM.writeValue('text', prop, instanceProperties[prop].nodes, newVal, customHtml);

                        instanceProperties[prop].value = newVal;

                        if (oldVal !== newVal && instanceEventHandlers.mutation.propertyvaluechange) {
                            instanceEventHandlers.mutation.propertyvaluechange.forEach(handler => {
                                let eventObject = {
                                    property: prop,
                                    oldValue: oldVal,
                                    newValue: newVal,
                                };

                                handler.call(instance, eventObject);
                            });
                        }
                    };

                }

                propertiesGetterSetterFuncs[prop] = {
                    get: () => {
                        let currentValue = instanceProperties[prop].value;
                        if (classProperties[prop].getter) {
                            return classProperties[prop].getter.call(instance, classes, prop, currentValue);
                        }
                        return currentValue;
                    },
                    set: setter,
                    enumerable: true,
                };
            });

            // Expose DOM elements via prefixed property
            Object.keys(instanceExposedDOMElems).forEach(keyName => {
                propertiesGetterSetterFuncs['$' + keyName] = {
                    value: instanceExposedDOMElems[keyName],
                };
            });

            // Apply getters and setters for local properties
            Object.defineProperties(instance, propertiesGetterSetterFuncs);
            Object.preventExtensions(instance);

            // Apply predefined property values
            for (let propName in classPredefinedProperties) {
                instance[propName] = classPredefinedProperties[propName].value;
            }
            for (let propName in classSubstitutionDefaultValues) {
                instance[propName] = Utils.clone(classSubstitutionDefaultValues[propName]);
            }

            // Apply given object argument to this new instance's properties
            if (initState) {
                instance.assign(initState);
            }

            // Remove any remaining parameter handlebars and set any undefined values
            // to the default type values
            classPropertyNames.forEach(propName => {

                if (instance[propName] === undefined) {

                    let types = instanceProperties[propName].types || ['null'];

                    if (classElementProperties.has(propName) || ~types.indexOf('null')) {
                        instance[propName] = null;
                    } else if (~types.indexOf('Array')) {
                        instance[propName] = [];
                    } else if (~types.indexOf('natural') || ~types.indexOf('integer') || ~types.indexOf('float') || ~types.indexOf('number')) {
                        instance[propName] = 0;
                    } else if (~types.indexOf('boolean')) {
                        instance[propName] = false;
                    } else if (~types.indexOf('string')) {
                        instance[propName] = '';
                    } else {
                        throw new Error(`Unknown type for property`);
                    }

                }

            });

            classConstructor.call(instance);

            // Update attribute nodes with parameter handlebars that have just been changed
            OOMLWriteChanges();
        };

        // Set properties for accessing properties' names and predefined properties' values
        classes[className][OOML_CLASS_PROPNAME_PROPNAMES] = classPropertyNames; // Already frozen
        classes[className][OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES] = classSuppressedProperties;
        classes[className][OOML_CLASS_PROPNAME_PREDEFINEDATTRS] = classAttributes; // Already frozen
        classes[className][OOML_CLASS_PROPNAME_PREDEFINEDPROPS] = classPredefinedProperties; // Already frozen
        classes[className][OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR] = classConstructor;
        classes[className][OOML_CLASS_PROPNAME_EXTENSIONPOINT] = classExtensionPointPath && {
            path: classExtensionPointPath,
            rootElem: classRootElem,
        };

        // Make class inherit from parent class
        classes[className].prototype = Object.create(classExtends.prototype);
        classes[className].prototype.constructor = classes[className];

        // Set defined methods in class prototype
        for (let methodName in classMethods) {
            Object.defineProperty(classes[className].prototype, methodName, {
                value: classMethods[methodName].fn
            });
        }
    });

    Object.freeze(classes);

    Utils.DOM.find(namespace, '[ooml-instantiate]').forEach(instanceInstantiationElem => {

        var instDetails  = instanceInstantiationElem.getAttribute('ooml-instantiate').split(' '),
            className    = instDetails[0],
            instanceName = instDetails[1];

        if (objects[instanceName]) {
            throw new ReferenceError(`An object already exists with the name "${ instanceName }"`);
        }

        var initState = Utils.getEvalValue(instanceInstantiationElem.textContent);
        var instance = new classes[className](initState);

        instanceInstantiationElem.parentNode.insertBefore(instance[OOML_INSTANCE_PROPNAME_DOMELEM], instanceInstantiationElem.nextSibling);

        // Copy attributes on instantiation element to new instance's root element
        Utils.iterate(instanceInstantiationElem.attributes, attr => {
            if (attr.name != 'ooml-instantiate') {
                instance[OOML_INSTANCE_PROPNAME_DOMELEM].setAttribute(attr.name, attr.value);
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
