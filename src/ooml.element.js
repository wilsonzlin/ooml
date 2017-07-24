OOML.Element = function() {
    throw new TypeError(`OOML.Element is an abstract class`);
};

let OOMLElementProto = OOML.Element.prototype;

OOMLElementProto.ondispatch = function(eventName, handler) {
    if (!Utils.typeOf(handler, TYPEOF_FUNCTION)) {
        throw new TypeError(`The handler for the dispatch event "${ eventName }" is not a function`);
    }

    if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
        throw new TypeError(`Event name is not a string`);
    }

    eventName = eventName.toLocaleLowerCase();

    let instanceEventHandlers = this[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH];

    if (!instanceEventHandlers[eventName]) {
        instanceEventHandlers[eventName] = [];
    }
    instanceEventHandlers[eventName].push(handler);
    return this;
};
OOMLElementProto.onmutation = function(eventName, handler) {
    if (!Utils.typeOf(handler, TYPEOF_FUNCTION)) {
        throw new TypeError(`The handler for the mutation event "${ eventName }" is not a function`);
    }

    if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
        throw new TypeError(`Event name is not a string`);
    }

    eventName = eventName.toLocaleLowerCase();

    let instanceEventHandlers = this[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_MUTATION];

    if (!instanceEventHandlers[eventName]) {
        instanceEventHandlers[eventName] = [];
    }
    instanceEventHandlers[eventName].push(handler);
    return this;
};
OOMLElementProto.detach = function() {
    let instance = this;

    let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

    if (!instanceIsAttachedTo.parent) {
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
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_ATTACH] = function(settings) {
    let instance = this;
    let instanceDom = instance[OOML_INSTANCE_PROPNAME_DOMELEM];
    let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

    if (instanceIsAttachedTo.parent) {
        throw new ReferenceError(`This instance is already in use`);
    }

    instanceIsAttachedTo.parent = settings.parent;
    instanceIsAttachedTo.property = settings.property;

    settings.insertAfter.parentNode.insertBefore(instanceDom, settings.insertAfter.nextSibling);
};
OOMLElementProto[OOML_INSTANCE_PROPNAME_DETACH] = function() {
    let instance = this;
    let instanceDom = instance[OOML_INSTANCE_PROPNAME_DOMELEM];
    let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

    if (!instanceIsAttachedTo.parent) {
        throw new Error(`This instance is not in use`);
    }

    instanceIsAttachedTo.parent = undefined;

    instanceDom.parentNode.removeChild(instanceDom);
};




OOMLElementProto.toObject = function() {

    let instance = this;
    let obj = Utils.createCleanObject();

    let klass = instance.constructor;

    klass[OOML_CLASS_PROPNAME_PROPNAMES].forEach((propName) => {
        if (klass[OOML_CLASS_PROPNAME_SUPPRESSEDPROPNAMES].has(propName)) {
            return;
        }

        let value = instance[propName];
        // Use instanceof; don't read from classArrayProperties or whatever
        if (value instanceof OOML.Array) {
            obj[propName] = value.toArray();
        } else if (value instanceof OOML.Element) {
            if (Utils.typeOf(value.serialise, TYPEOF_FUNCTION)) {
                let serialised = value.serialise();
                if (serialised !== undefined) {
                    if (!Utils.isPrimitiveValue(serialised)) {
                        throw new TypeError(`Value returned from serialise function is not primitive`);
                    }
                    obj[propName] = serialised;
                }
            } else {
                obj[propName] = value.toObject();
            }
        } else {
            obj[propName] = value;
        }
    });

    return obj;
};
OOMLElementProto.toJSON = function(indentation) {
    return JSON.stringify(this.toObject(), undefined, indentation);
};
OOMLElementProto.assign = function() {
    let oomlInstance = this;

    for (let i = 0; i < arguments.length; i++) {

        let source = arguments[i];

        // Don't use Object.assign because 1) compatibility 2) it sets non-existent properties
        Object.keys(source).forEach((prop) => oomlInstance[prop] = source[prop]); // Probably don't need to clone as not mutated
    }

    return oomlInstance;
};
if (OOMLCompatSymbolExists) {
    OOMLElementProto[Symbol.iterator] = function() {
        let inst = this;
        let propNamesIterator = inst.constructor[OOML_CLASS_PROPNAME_PROPNAMES].values();

        return {
            next: () => {
                let it = propNamesIterator.next();
                if (it.done) {
                    return it;
                }
                let itValue = it.value;
                return { value: [itValue, inst[itValue]], done: false };
            }
        };
    };
}
