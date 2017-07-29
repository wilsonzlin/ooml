// declaredProperties is required to check that substitutions reference existing properties
// declaredMethods is required to check that handlers reference existing methods
Utils.transformClassRawDomToViewShape = (declaredProperties, declaredMethods, current) => {

    if (current instanceof Element) {
        // The name of the tag
        let elemName = current.nodeName.toLocaleLowerCase();

        // Already handled by processClassDeclaration, so don't need to to do anything
        if (elemName == 'ooml-extension-point') {
            return;
        }

        // Due to the way table tags are parsed in browsers, allow alternative syntax
        if (/^ooml-(?:table|thead|tbody|tfoot|tr|th|td)$/.test(elemName)) {
            elemName = elemName.slice(5);
        }

        let elemDomEventHandlers = Utils.createCleanObject();
        let elemAttributes = [];
        let elemChildNodes = [];

        // To check that there are no attributes declared more than once
        let attrNames = new StringSet();

        // Process DOM attribute
        Utils.iterate(current.attributes, attr => {

            // DOM attributes should be case-insensitive
            let attrName = attr.name.toLocaleLowerCase();

            // Check if already declared
            if (attrNames.has(attrName)) {
                throw new ReferenceError(`Duplicate attribute "${ attrName }"`);
            }
            attrNames.add(attrName);

            // DOM event handlers
            if (/^handle-/.test(attrName)) {
                // Don't need to lowercase, as it already is
                let eventName = attrName.slice(7);

                if (elemDomEventHandlers[eventName]) {
                    throw new ReferenceError(`Another DOM "${ eventName }" event handler already exists`);
                }

                // TODO Check method exists
                elemDomEventHandlers[eventName] = attr.value;

            // Native syntax is not allowed
            } else if (/^on/.test(attrName)) {
                throw new TypeError(`Native DOM event handlers using on* syntax are not allowed ("${ attrName }")`);

            // Normal HTML attribute
            } else {
                elemAttributes.push(Utils.transformClassRawDomToViewShape(attr));
            }
        });

        // Process child nodes
        Utils.iterate(current.childNodes, childNode => {
            let parsed = Utils.transformClassRawDomToViewShape(childNode);

            if (Array.isArray(parsed)) {
                Array.prototype.push.apply(elemChildNodes, parsed);

            // Could be undefined
            } else if (parsed) {
                elemChildNodes.push(parsed);
            }
        });

        return Object.freeze({
            type: 'element',
            name: elemName,
            domEventHandlers: elemDomEventHandlers,
            attributes: elemAttributes,
            childNodes: elemChildNodes,
        });
    }


    if (current instanceof Text) {
        let processed = Utils.processBracesSyntaxToPartsAndMap({
            onbracepart: param => {
                let propertyToSubstituteIn = Utils.parseClassViewSubstitution(param);
                // TODO Check property is valid

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


        if (attrValue.indexOf('{{') == -1) {
            return Object.freeze({
                type: 'attribute',
                name: attrName,
                value: attrValue,
            });

        } else {
            let processed = Utils.processBracesSyntaxToPartsAndMap({
                onbracepart: param => {
                    let propertyToSubstituteIn = Utils.parseClassViewSubstitution(param);
                    // TODO Check property is valid (can only be primitive or transient)

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
