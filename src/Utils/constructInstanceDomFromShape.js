Utils.constructInstanceDomFromShape = config => {
  let instance = config.instance;
  let instanceProperties = config.instanceProperties;
  let instanceExposedDOMElems = config.instanceExposedDOMElems;
  let shape = config.shape;

  let cloned;

  switch (shape.type) {
  case "element":
    cloned = document.createElement(shape.name);

    // Expose HTMLElement
    if (shape.exposeKey) {
      instanceExposedDOMElems[shape.exposeKey] = cloned;
    }

    Object.keys(shape.domEventHandlers)
      .forEach(eventName => {
        let linkedMethod = shape.domEventHandlers[eventName];

        // Event object will be provided when called by browser
        // Arrow functions are faster than .bind, and can save memory by removing visible but unused scope variables
        // https://stackoverflow.com/questions/42117911/lambda-functions-vs-bind-memory-and-performance
        cloned.addEventListener(eventName, event => {
          // This is probably faster than .call
          // Don't need to pass in cloned shape, as event will have .target
          return instance[linkedMethod](event);
        });
      });

    shape.attributes.forEach(attr => {
      // Set normal HTML tag attribute
      if (!attr.parts) {
        cloned.setAttribute(attr.name, attr.value);

        // Set up dynamic HTML attribute
      } else {
        // COMPATIBILITY - IE: Don't use .(get|set)Attribute(Node)? -- buggy behaviour in IE
        // This is an emulated Node instance
        let clonedAttr = {
          name: attr.name,
          valueFormat: attr.parts.slice(),
          valueFormatMap: attr.map,
          ownerElement: cloned,
        };

        Object.keys(attr.map)
          .forEach(propertyName => {
            instanceProperties[propertyName].nodes.add(clonedAttr);
          });
      }
    });

    shape.childNodes.forEach(childNode => {
      cloned.appendChild(Utils.constructInstanceDomFromShape({
        instance: instance,
        instanceProperties: instanceProperties,
        instanceExposedDOMElems: instanceExposedDOMElems,
        shape: childNode
      }));
    });

    break;

  case "text":
    cloned = document.createTextNode(shape.value || "");

    if (shape.substitutionProperty) {
      instanceProperties[shape.substitutionProperty].nodes.add(cloned);
    }

    break;

  case "comment":
    cloned = document.createComment(shape.value || "");

    if (shape.substitutionProperty) {
      instanceProperties[shape.substitutionProperty].insertAfter = cloned;
    }

    break;

  default:
    // Defensive coding
    throw new Error(`Invalid class view shape type to process`);
  }

  return cloned;
};
