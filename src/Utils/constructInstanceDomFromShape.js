Utils.constructInstanceDomFromShape = ({ instance, instanceProperties, instanceExposedDOMElems, node }) => {
    let cloned;

    switch (node.type) {
        case 'element':

            cloned = document.createElement(node.name);

            Object.keys(node.domEventHandlers).forEach(eventName => {

                // Event object will be provided when called by browser
                cloned['on' + eventName] = node.domEventHandlers[eventName].bind(instance, cloned);

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
                            instanceProperties[propertyName].nodes.add(clonedAttr);
                        });
                    }
                }
            });

            node.childNodes.forEach(childNode => {
                cloned.appendChild(Utils.constructInstanceDomFromShape({
                    instance, instanceProperties, instanceExposedDOMElems,
                    node: childNode
                }));
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
};
