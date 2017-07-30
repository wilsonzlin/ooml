// declaredProperties is required to check that substitutions reference existing properties
// declaredMethods is required to check that handlers reference existing methods
Utils.transformClassRawDomToViewShape = (declaredProperties, declaredMethods, current, arrayOrInstanceSubstitutionsCount, exposeKeys, pathFromRoot, realPathToExtensionPoint) => {

    if (current instanceof Element) {
        // The name of the tag
        let elemName = current.nodeName.toLocaleLowerCase();

        // Due to the way table tags are parsed in browsers, allow alternative syntax
        if (/^ooml-(?:table|thead|tbody|tfoot|tr|th|td)$/.test(elemName)) {
            elemName = elemName.slice(5);
        }

        let elemExposeKey; // `undefined` default
        let elemDomEventHandlers = Utils.createCleanObject();
        let elemAttributes = [];
        let elemChildNodes = [];

        // To check that there are no attributes declared more than once
        let attrNames = new StringSet();

        // Process DOM attributes
        Utils.iterate(current.attributes, attr => {

            // DOM attributes should be case-insensitive
            let attrName = attr.name.toLocaleLowerCase();
            let attrValue = attr.value;

            // Check if already declared
            if (attrNames.has(attrName)) {
                throw new ReferenceError(`Duplicate attribute "${ attrName }"`);
            }
            attrNames.add(attrName);

            // DOM event handlers
            if (/^handle-/.test(attrName)) {
                // Don't need to lowercase, as it already is
                let eventName = attrName.slice(7);

                // Attribute name is unique, so don't need to check for duplicates

                let methodName = Utils.parseMethodLinkingDeclaration(attrValue);
                if (!declaredMethods[methodName]) {
                    throw new ReferenceError(`The method "${ methodName }" is linked to, but has not been declared`);
                }
                elemDomEventHandlers[eventName] = methodName;

            // Native syntax is not allowed
            } else if (/^on/.test(attrName)) {
                throw new TypeError(`Native DOM event handlers using on* syntax are not allowed ("${ attrName }")`);

            } else if (attrName == "ooml-expose") {
                if (!Utils.isValidPropertyName(attrValue)) {
                    throw new SyntaxError(`ooml-expose value is invalid ("${attrValue}")`);
                }
                elemExposeKey = attrValue;
                if (exposeKeys.has(elemExposeKey)) {
                    throw new ReferenceError(`More than one element has been exposed with "${ elemExposeKey }"`);
                }
                exposeKeys.add(elemExposeKey);

            // Normal HTML attribute
            } else {
                elemAttributes.push(Utils.transformClassRawDomToViewShape(declaredProperties, declaredMethods, attr));
            }
        });

        // Process child nodes
        Utils.iterate(current.childNodes, childNode => {
            let parsed;
            let nextPathFromRoot;

            if (pathFromRoot && !realPathToExtensionPoint.found && childNode instanceof Element) {
                nextPathFromRoot = pathFromRoot.concat(elemChildNodes.length);
                parsed = Utils.transformClassRawDomToViewShape(declaredProperties, declaredMethods, childNode, arrayOrInstanceSubstitutionsCount, exposeKeys, nextPathFromRoot, realPathToExtensionPoint);
            } else {
                parsed = Utils.transformClassRawDomToViewShape(declaredProperties, declaredMethods, childNode, arrayOrInstanceSubstitutionsCount);
            }

            if (Array.isArray(parsed)) {
                Array.prototype.push.apply(elemChildNodes, parsed);

            // Could be undefined
            } else if (parsed) {
                elemChildNodes.push(parsed);

                if (parsed.type == 'element' && parsed.name == 'ooml-extension-point') {
                    if (realPathToExtensionPoint.found) {
                        throw new SyntaxError(`Multiple extension points declared`);
                    }

                    if (parsed.childNodes.length || parsed.attributes.length) {
                        throw new SyntaxError(`ooml-extension-point tag has attributes or contents`);
                    }

                    realPathToExtensionPoint.found = true;
                    realPathToExtensionPoint.path = nextPathFromRoot;
                }
            }
        });

        return Object.freeze({
            type: 'element',
            name: elemName,
            exposeKey: elemExposeKey,
            domEventHandlers: elemDomEventHandlers,
            attributes: elemAttributes,
            childNodes: elemChildNodes,
        });
    }


    if (current instanceof Text) {
        let processed = Utils.processBracesSyntaxToPartsAndMap({
            onbracepart: param => {
                let propertyToSubstituteIn = Utils.parsePropertySubstitution(param);
                let declaredProperty = declaredProperties[propertyToSubstituteIn];

                if (!declaredProperty) {
                    throw new ReferenceError(`The property "${ propertyToSubstituteIn }" is substituted in the view, but has not been declared`);
                }

                if (declaredProperty.isArray || declaredProperty.isInstance) {
                    if (!arrayOrInstanceSubstitutionsCount[propertyToSubstituteIn]) {
                        arrayOrInstanceSubstitutionsCount[propertyToSubstituteIn] = true;
                    } else {
                        throw new ReferenceError(`Array and instance properties may only be substituted at most once`);
                    }
                }

                return {
                    value: Object.freeze({
                        type: 'text',
                        substitutionProperty: propertyToSubstituteIn,
                    }),
                };
            },
            onstaticpart: data => {
                return {
                    value: Object.freeze({
                        type: 'text',
                        value: data,
                    }),
                };
            },
            syntax: current.data,
        });

        return Object.freeze(processed.parts);
    }

    if (current instanceof Comment) {
        return Object.freeze({
            type: 'comment',
            value: current.value,
        });
    }

    if (current instanceof Attr) {
        let attrName = current.name;
        if (attrName == 'ooml-style') {
            // IE discards invalid style attributes (and ones with OOML bindings count as invalid), so allow alternative syntax
            attrName = 'style';
        }
        let attrValue = current.value;

        // Normal attribute
        if (attrValue.indexOf('{{') == -1) {
            return Object.freeze({
                type: 'attribute',
                name: attrName,
                value: attrValue,
            });

        } else {
            let processed = Utils.processBracesSyntaxToPartsAndMap({
                onbracepart: param => {
                    let propertyToSubstituteIn = Utils.parsePropertySubstitution(param);

                    let declaredProperty = declaredProperties[propertyToSubstituteIn];

                    if (!declaredProperty) {
                        throw new ReferenceError(`The property "${ propertyToSubstituteIn }" is substituted in the view, but has not been declared`);
                    }
                    if (declaredProperty.isArray || declaredProperty.isInstance) {
                        throw new ReferenceError(`The property "${ propertyToSubstituteIn }" is substituted in an attribute in the view, but is an array or instance`);
                    }

                    return {
                        key: propertyToSubstituteIn,
                    };
                },
                syntax: attrValue,
            });

            return Object.freeze({
                type: 'attribute',
                name: attrName,
                parts: processed.parts,
                map: processed.map,
            });
        }
    }
};
