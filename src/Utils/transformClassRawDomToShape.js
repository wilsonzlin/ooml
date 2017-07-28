Utils.transformClassRawDomToShape = current => {

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

                    default:
                        throw new SyntaxError(`Unknown attribute "${ _attrName }" on element substitution property declaration`);
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

                ret.attributes.push(transformClassRawDomToShape(attr));

            }
        });

        Utils.iterate(current.childNodes, childNode => {
            let parsedChildNodes = transformClassRawDomToShape(childNode);
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
