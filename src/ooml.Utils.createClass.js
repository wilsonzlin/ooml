Utils.parseClassDomTextSubstitution = code => {
    let regexpMatches = /^(?: ((?:(?:[a-zA-Z.]+)\|)*[a-zA-Z.]+))? (@)?this\.(.+?) $/.exec(code);
    if (!regexpMatches || !regexpMatches[4]) {
        // .slice to prevent super-long messages
        throw new SyntaxError(`Invalid property declaration around:\n\n${ code.slice(0, 200) }\n`);
    }

    let types = regexpMatches[1] || undefined;
    let propName = regexpMatches[3];
    let isSuppressed = !!regexpMatches[2];

    if (!Utils.isValidPropertyName(propName)) {
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
};

Utils.parseClassDom = current => {

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

                    case 'transient':
                        if (_attrVal !== '') {
                            throw new SyntaxError(`Invalid "transient" attribute value for element substitution property`);
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
                        if (!classMethods[_attrVal]) {
                            throw new ReferenceError(`ooml-substitution getter is set to non-existent method "${_attrVal}"`);
                        }

                        getter = _attrVal;
                        break;

                    case 'set':
                        if (Utils.isNotOrBlankString(_attrVal)) {
                            throw new SyntaxError(`Invalid ${ _attrName } function`);
                        }
                        if (isArraySubstitution) {
                            throw new SyntaxError(`Array substitutions cannot have getters or setters`);
                        }
                        if (!classMethods[_attrVal]) {
                            throw new ReferenceError(`ooml-substitution getter is set to non-existent method "${_attrVal}"`);
                        }

                        setter = _attrVal;
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
                        if (/^handle-/.test(_attrName)) {

                            // Don't need to lowercase -- it already is
                            let eventName = _attrName.slice(7);

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
            // TODO: Check tag is empty (no attributes or childNodes)

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

            if (/^handle-/.test(attrName)) {

                // Don't need to lowercase -- it already is
                let eventName = attrName.slice(7);

                if (ret.domEventHandlers[eventName]) {
                    throw new ReferenceError(`Another DOM "${ eventName }" event handler already exists`);
                }

                ret.domEventHandlers[eventName] = attr.value;

            } else if (/^on/.test(attrName)) {

                throw new TypeError(`Native DOM event handlers are not allowed ("${attrName}")`);

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
                throw new SyntaxError(`Matching closing brace not found around:\n\n${nodeValue.slice(0, 200)}\n`);
            }
            // Remove opening and closing braces:
            // "{{ this.propName }}"         becomes " this.propName "
            let code = nodeValue.slice(2, indexOfClosingBrace);

            let textSubstitutionConfig = Utils.parseClassDomTextSubstitution(code);

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

                let textSubstitutionConfig = Utils.parseClassDomTextSubstitution(code);
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
};

Utils.createOOMLClass = ({ className, classParent, classMethods, classConstructor, classIsAbstract, classProperties }) => {
    let oomlClass = function(initState) {
        let instance = this;
        let instanceIsAttachedTo = {};

        if (!(instance instanceof oomlClass)) {
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
                throw new TypeError(`Unable to construct new instance; "${ className }" is an abstract class`);
            }

            let ret = instance.abstractFactory(initState);
            if (!(ret instanceof OOML.Element)) {
                throw new TypeError(`Abstract factory returned value is not an OOML instance`);
            }

            return ret;
        }

        // Create a copy of the classProperties to use as this instance's internal state
        let instanceProperties = Utils.deepClone(classProperties);
        Object.keys(instanceProperties).forEach(propertyName => {
            instanceProperties[propertyName].insertAfter = undefined;

            // Use NodeSet as attributes may be binded to the same property more than once
            instanceProperties[propertyName].nodes = new NodeSet();
        });

        // Map from property names to properties that have a dynamic binding dependent on it
        let propertiesToDependentBindings = Utils.createCleanObject();
        let propertyRebindSetTimeouts = Utils.createCleanObject();

        let mutationEventHandlers = Utils.createCleanObject();
        let dispatchEventHandlers = Utils.createCleanObject();

        let instanceExposedDOMElems = Utils.createCleanObject(); // { "key": HTMLElement }
        let instanceDom = Utils.constructInstanceDomFromShape({
            instance, instanceProperties, instanceExposedDOMElems,
            node: classRootElem
        });

        let instanceObjectProperties = Utils.createCleanObject();
        instanceObjectProperties[OOML_INSTANCE_PROPNAME_DOMELEM]                       = instanceDom;
        instanceObjectProperties[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH]       = dispatchEventHandlers;
        instanceObjectProperties[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION]       = mutationEventHandlers;
        instanceObjectProperties[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT]            = instanceIsAttachedTo;
        instanceObjectProperties[OOML_INSTANCE_PROPNAME_PROPERTIES_INTERNAL_OBJECT]    = instanceProperties;
        instanceObjectProperties[OOML_INSTANCE_PROPNAME_PROPERTY_REBIND_SET_TIMEOUTS]  = propertyRebindSetTimeouts;

        // Expose DOM elements via prefixed property
        Object.keys(instanceExposedDOMElems).forEach(keyName => {
            instanceObjectProperties['$' + keyName] = instanceExposedDOMElems[keyName];
        });

        // Apply getters and setters for local properties
        for (let p in instanceObjectProperties) {
            Object.defineProperty(instance, p, { value: instanceObjectProperties });
        }

        // Prevent assigning to non-existent properties
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
    oomlClass[OOML_CLASS_PROPNAME_PROPNAMES] = classPropertyNames; // Already frozen
    oomlClass[OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES] = classSuppressedProperties;
    oomlClass[OOML_CLASS_PROPNAME_PREDEFINEDPROPS] = classPredefinedProperties; // Already frozen
    oomlClass[OOML_CLASS_PROPNAME_PREDEFINEDCONSTRUCTOR] = classConstructor;
    oomlClass[OOML_CLASS_PROPNAME_EXTENSIONPOINT] = classHasExtensionPoint && classRawDom;
    oomlClass[OOML_CLASS_PROPNAME_ROOTELEMTAGNAME] = classRootElem && classRootElem.name;
    Object.defineProperty(oomlClass, "name", { value: className });

    // Make class inherit from parent class
    oomlClass.prototype = Object.create(classExtends.prototype);
    let classProtoPropertiesConfig = Utils.createCleanObject();

    classProtoPropertiesConfig.constructor = { value: oomlClass };
    // Do this to allow instance methods access to this namespace's classes
    classProtoPropertiesConfig.namespace = { value: oomlNamespaceInstance };

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

    Object.defineProperties(oomlClass.prototype, classProtoPropertiesConfig);

    return oomlClass;
};

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
