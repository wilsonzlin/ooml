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
            This is a classMetadata:

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
        let classPredefinedProperties = Utils.deepFreeze(Utils.concat(Utils.clone(classExtends[OOML_CLASS_PROPNAME_PREDEFINEDPROPS]) || Utils.createCleanObject(), classMetadata.properties));

        // Will be frozen later
        let classProperties = Utils.clone(classPredefinedProperties);

        // Just for quick reference, nothing more
        let classArrayProperties = new StringSet();
        let classElementProperties = new StringSet();
        let classSubstitutionDefaultValues = Utils.createCleanObject();

        // For .toObject
        let classSuppressedProperties = new StringSet();

        Object.keys(classProperties).forEach(propName => {
            if (classProperties[propName].suppressed) {
                classSuppressedProperties.add(propName);
            }
        });

        let classAttributes = Utils.deepFreeze(Utils.concat(Utils.clone(classExtends[OOML_CLASS_PROPNAME_PREDEFINEDATTRS]) || Utils.createCleanObject(), classMetadata.attributes));

        let classMethods = classMetadata.methods;

        let classConstructor = classMetadata.constructor;

        function parseClassDomTextSubstitution(code) {
            let regexpMatches = /^(?: ((?:(?:[a-zA-Z.]+)\|)*[a-zA-Z.]+))? (@)?this\.(.+?) $/.exec(code);
            if (!regexpMatches || !regexpMatches[4]) {
                // .slice to prevent super-long messages
                throw new SyntaxError(`Invalid property declaration at "${ code.slice(0, 200) }"`);
            }

            let types = regexpMatches[1] || undefined;
            let propName = regexpMatches[3];
            let isSuppressed = !!regexpMatches[2];

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

            return {
                isAttribute: isAttribute,
                name: propName,
            };
        }

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

        let classRootElem = (function parseClassDom(current) {

            let ret;

            if (current instanceof Element) {

                let elemName = current.nodeName.toLocaleLowerCase();

                if (elemName == 'ooml-substitution') {
                    let elemConstructorName;
                    let propName, passthroughPropName;
                    let isArraySubstitution = false;
                    let isSuppressed = false;

                    let getter, setter;

                    let dispatchEventHandlers = Utils.createCleanObject();

                    Utils.iterate(current.attributes, _attr => {
                        let _attrName = _attr.name.toLocaleLowerCase();
                        let _attrVal = _attr.value;

                        switch (_attrName) {
                            case 'name':
                                propName = _attrVal;
                                break;

                            case 'type':
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
                                if (passthroughPropName != undefined) {
                                    throw new SyntaxError(`Array substitutions cannot be passed through`);
                                }
                                if (getter || setter) {
                                    throw new SyntaxError(`Array substitutions cannot have getters or setters`);
                                }
                                isArraySubstitution = true;
                                break;

                            case 'get':
                                if (Utils.isNotOrBlankString(_attrVal)) {
                                    throw new SyntaxError(`Invalid ${ _attrName } function`);
                                }
                                if (isArraySubstitution) {
                                    throw new SyntaxError(`Array substitutions cannot have getters or setters`);
                                }

                                getter = Function('classes', 'property', 'currentValue', 'dispatch', `"use strict";${ _attrVal }`);
                                break;

                            case 'set':
                                if (Utils.isNotOrBlankString(_attrVal)) {
                                    throw new SyntaxError(`Invalid ${ _attrName } function`);
                                }
                                if (isArraySubstitution) {
                                    throw new SyntaxError(`Array substitutions cannot have getters or setters`);
                                }

                                setter = Function('classes', 'property', 'currentValue', 'newValue', 'dispatch', `"use strict";${ _attrVal }`);
                                break;

                            case 'passthrough':
                                if (isArraySubstitution) {
                                    throw new SyntaxError(`Array substitutions cannot be passed through`);
                                }
                                if (Utils.isNotOrBlankString(_attrVal)) {
                                    throw new SyntaxError(`Invalid passthrough property name`);
                                }
                                passthroughPropName = _attrVal;
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

                    if (passthroughPropName != undefined) {
                        if (elemConstructor == OOML.Element || elemConstructor[OOML_CLASS_PROPNAME_PROPNAMES].indexOf(passthroughPropName) == -1) {
                            throw new ReferenceError(`"${ passthroughPropName }" is not a valid passthrough property`);
                        }
                    }

                    classProperties[propName] = {
                        types: [elemConstructor],
                        isArray: isArraySubstitution,
                        value: undefined,
                        suppressed: isSuppressed,
                        passthrough: passthroughPropName,
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
                    if (classHasExtensionPoint) {
                        throw new ReferenceError(`An extension point already exists`);
                    }
                    if (current == classMetadata.rootElem) {
                        throw new SyntaxError(`The extension point cannot be the root`);
                    }
                    classHasExtensionPoint = true;

                    // WARNING: Code returns here -- DOES NOT PROCEED
                    return;
                }

                if (/^ooml-(?:table|thead|tbody|tfoot|tr|th|td)$/.test(elemName)) {
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
                    let parsedChildNodes = parseClassDom(childNode);
                    if (Array.isArray(parsedChildNodes)) {
                        Array.prototype.push.apply(ret.childNodes, parsedChildNodes);
                    } else if (parsedChildNodes) {
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
                    nodeName = 'style';
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
        })(classRawDom);

        Utils.deepFreeze(classProperties);
        let classPropertyNames = Object.freeze(Object.keys(classProperties));

        classes[className] = function(initState) {
            let instance = this;
            let instanceIsAttachedTo = {};

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

            let instanceProperties = Utils.clone(classProperties);
            Object.keys(instanceProperties).forEach(propertyName => {
                instanceProperties[propertyName].insertAfter = undefined;
                instanceProperties[propertyName].nodes = new NodeSet(); // Use NodeSet as attributes may be binded to the same property more than once
            });

            // Map from property names to properties and attributes that have a dynamic binding dependent on it
            let propertiesToDependentBindings = Utils.createCleanObject();
            // Map from attribute names to properties and attributes that have a dynamic binding dependent on it
            // TODO Remove attributes
            let propertyRebindSetTimeouts = Utils.createCleanObject();
            function rebindDynamicBinding(property) {

                clearTimeout(propertyRebindSetTimeouts[property]);

                propertyRebindSetTimeouts[property] = setTimeout(() => {
                    let internalObject = instanceProperties[property];
                    let currentBindingId = internalObject.bindingId;

                    if (internalObject.bindingIsDynamic) {
                        internalObject.bindingKeypath = internalObject.bindingParts.join("");
                    }

                    if (currentBindingId != undefined) {
                        hive.unbind(currentBindingId);
                    }

                    internalObject.bindingId = hive.bind(internalObject.bindingKeypath, instance, property);
                }, 50);
            }


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

            let propertiesGetterSetterFuncs = Utils.createCleanObject();
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_DOMELEM] = {
                value: instanceDom,
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_BINDING_ON_STORE_VALUE_CHANGE] = {
                value: (propName, storeValue) => {
                    handleBindingChangeEventFromStore(instanceProperties[propName], instance, propName, storeValue);
                },
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_DISPATCH] = {
                value: (propName, eventName, data) => {
                    if (classProperties[propName].dispatchEventHandlers[eventName]) {
                        classProperties[propName].dispatchEventHandlers[eventName].call(instance, dispatchEventToParent, classes, data);
                    }
                },
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH] = {
                value: instanceEventHandlers.dispatch,
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION] = {
                value: instanceEventHandlers.mutation,
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT] = {
                value: instanceIsAttachedTo,
            };
            propertiesGetterSetterFuncs[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT] = {
                value: instanceProperties,
            };

            // Expose DOM elements via prefixed property
            Object.keys(instanceExposedDOMElems).forEach(keyName => {
                propertiesGetterSetterFuncs['$' + keyName] = {
                    value: instanceExposedDOMElems[keyName],
                };
            });

            // Apply getters and setters for local properties
            Object.defineProperties(instance, propertiesGetterSetterFuncs);
            Object.preventExtensions(instance);

            if (initState) {
                Object.keys(initState).forEach(propName => {
                    if (classPropertyNames.indexOf(propName) < 0) {
                        throw new ReferenceError(`The property "${propName}" provided in an element substitution's default value does not exist`);
                    }
                });
            }

            classPropertyNames.forEach(propName => {
                if (Utils.hasOwnProperty(initState, propName)) {
                    // If passthrough, initialise instance with initState built-in (to prevent it counting as a change, and to increase efficiency)
                    if (classProperties[propName].passthrough != undefined) {
                        let initStateUnserialised = Utils.createCleanObject();
                        initStateUnserialised[classProperties[propName].passthrough] = initState[propName];
                        if (Utils.hasOwnProperty(classSubstitutionDefaultValues, propName)) {
                            // WARNING: Unknown if should clone classSubstitutionDefaultValues value first
                            instance[propName] = Utils.concat(classSubstitutionDefaultValues[propName], initStateUnserialised);
                        } else {
                            instance[propName] = initStateUnserialised;
                        }
                    } else {
                        instance[propName] = initState[propName];
                    }
                } else if (Utils.hasOwnProperty(classSubstitutionDefaultValues, propName)) {
                    // WARNING: Unknown if should clone first
                    instance[propName] = classSubstitutionDefaultValues[propName];
                } else if (Utils.hasOwnProperty(classPredefinedProperties, propName)) {
                    instance[propName] = classPredefinedProperties[propName].value;
                } else if (instance[propName] === undefined) { // WARNING: Must check as array substitution properties have value already set
                    // Set any undefined values to their default type values
                    let types = instanceProperties[propName].types;

                    if (classElementProperties.has(propName)) {
                        instance[propName] = classProperties[propName].passthrough != undefined ? {} : null;
                    } else {
                        instance[propName] = Utils.getDefaultPrimitiveValueForTypes(types);
                    }
                }
            });

            // Get all predefined attributes properties (including inherited ones)
            let ancestorClasses = [];
            let currentProto = Object.getPrototypeOf(this);

            while (currentProto !== OOML.Element.prototype) {
                ancestorClasses.unshift(currentProto.constructor);
                currentProto = Object.getPrototypeOf(currentProto);
            }

            let builtConstructor = ancestorClasses.reduce((previous, ancestorClass) => {
                return ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR] ? ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR].bind(instance, previous) : previous;
            }, undefined);
            if (builtConstructor) {
                builtConstructor();
            }

            // Update attribute nodes with parameter handlebars that have just been changed
            OOMLWriteChanges();
        };

        // Set properties for accessing properties' names and predefined properties' values
        classes[className][OOML_CLASS_PROPNAME_PROPNAMES] = classPropertyNames; // Already frozen
        classes[className][OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES] = classSuppressedProperties;
        classes[className][OOML_CLASS_PROPNAME_PREDEFINEDATTRS] = classAttributes; // Already frozen
        classes[className][OOML_CLASS_PROPNAME_PREDEFINEDPROPS] = classPredefinedProperties; // Already frozen
        classes[className][OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR] = classConstructor;
        classes[className][OOML_CLASS_PROPNAME_EXTENSIONPOINT] = classHasExtensionPoint && classRawDom;
        classes[className][OOML_CLASS_PROPNAME_ROOTELEMTAGNAME] = classRootElem && classRootElem.name;
        Object.defineProperty(classes[className], "name", { value: className });

        // Make class inherit from parent class
        classes[className].prototype = Object.create(classExtends.prototype);
        classes[className].prototype.constructor = classes[className];

        let classProtoPropertiesConfig = Utils.createCleanObject();
        classPropertyNames.forEach(prop => {

            let setter;

            if (classArrayProperties.has(prop)) {

                // Element array substitution
                setter = function(newVal) {
                    this[OOML_INSTANCE_PROPNAME_SET_ARRAY_PROPERTY](prop, newVal);
                };

            } else if (classElementProperties.has(prop)) {

                // Element substitution
                setter = function(newVal) {
                    this[OOML_INSTANCE_PROPNAME_SET_OBJECT_PROPERTY](prop, newVal);
                };

            } else {
                // TODO Cleanup
                // Set up the binding if it has one
                let bindingConfig = instanceProperties[prop].binding;
                if (bindingConfig) {
                    instanceProperties[prop].bindingState = BINDING_STATE_INIT;
                    if (bindingConfig.isDynamic) {
                        let propertyToPartMap = bindingConfig.propertyToPartMap;
                        Object.keys(propertyToPartMap).forEach(k => {
                            if (k != "attributes") {
                                if (!propertiesToDependentBindings[k]) {
                                    propertiesToDependentBindings[k] = {
                                        attributes: new StringSet(),
                                        properties: new StringSet(),
                                    };
                                }
                                propertiesToDependentBindings[k].properties.add(prop);
                            }
                        });
                        Object.keys(propertyToPartMap.attributes).forEach(k => {
                            if (!propertiesToDependentBindings.attributes[k]) {
                                propertiesToDependentBindings.attributes[k] = {
                                    attributes: new StringSet(),
                                    properties: new StringSet(),
                                };
                            }
                            propertiesToDependentBindings.attributes[k].properties.add(prop);
                        });
                    } else {
                        rebindDynamicBinding(prop);
                    }
                }

                setter = function(newValue) {
                    // .bind is more expensive than closure
                    // Also, .bind would prevent "this" value from being auto applied
                    return this[OOML_INSTANCE_PROPNAME_SET_PRIMITIVE_PROPERTY](prop, newValue);
                };

            }

            classProtoPropertiesConfig[prop] = {
                get: function() {
                    return this[OOML_INSTANCE_PROPNAME_GET_PROPERTY](prop);
                },
                set: setter,
                // Don't make enumerable, as this is on prototype, so not enumerable anyway
            };
        });

        // Set defined methods in class prototype
        for (let methodName in classMethods) {
            classProtoPropertiesConfig[methodName] = { value: classMethods[methodName].fn };
        }

        Object.defineProperties(classes[className].prototype, classProtoPropertiesConfig);
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
