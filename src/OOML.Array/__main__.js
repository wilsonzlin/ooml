OOML.Array = function(elementConstructor, initialElems) {
    let _this = this;

    // When this array is detached, the DOM elements of each OOML instance in this array
    // needs to be parked somewhere
    let placeholderDomParent = document.createElement('div');
    let domAnchor = document.createComment('');
    placeholderDomParent.appendChild(domAnchor);

    let internalArr;
    if (initialElems) {
        internalArr = initialElems.map(elem => Utils.constructOOMLInstance(elementConstructor, elem));
        internalArr.reduce((previousElem, elemToAttach) => {
            elemToAttach[OOML_INSTANCE_PROPNAME_ATTACH]({ insertAfter: previousElem, parent: _this });
            return elemToAttach[OOML_INSTANCE_PROPNAME_DOMELEM];
        }, domAnchor);
    } else {
        internalArr = [];
    }

    let dispatchEventHandlers = Utils.createCleanObject();
    let mutationEventHandlers = Utils.createCleanObject();

    // Use defineProperty for properties to prevent enumeration
    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_INTERNAL_ARRAY, {
        value: internalArr,
    });

    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE, {
        value: undefined,
        writable: true,
    });
    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_PROPERTY, {
        value: undefined,
        writable: true,
    });

    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR, {
        value: elementConstructor,
    });
    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_DOM_ANCHOR, {
        value: domAnchor,
    });
    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_INTERNAL_DOM_PARENT, {
        value: placeholderDomParent,
    });

    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_DISPATCH_HANDLERS, {
        value: dispatchEventHandlers,
    });
    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_MUTATION_OBSERVERS, {
        value: mutationEventHandlers,
    });

    Object.preventExtensions(_this);
};
let OOMLArrayProto = OOML.Array.prototype;
let OOMLArrayProtoMutation = Utils.createCleanObject();
