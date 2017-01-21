OOML.Array = function(elementConstructor, insertAfterDomElem, attachedToInstance, attachedToProperty) {
    let _this = this;

    let dispatchEventHandlers = Utils.createCleanObject();

    // Use defineProperty for properties to prevent enumeration
    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_INTERNALARRAY, {
        value: [],
        writable: true,
    });
    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR, {
        value: elementConstructor,
    });
    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM, {
        value: insertAfterDomElem,
    });

    Object.defineProperty(_this, OOML_INSTANCE_PROPNAME_DISPATCH, {
        value: (_, eventName, eventData) => {

            if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
                throw new TypeError(`Event name isn't a string`);
            }

            eventName = eventName.toLocaleLowerCase();

            let prevented = false;

            if (dispatchEventHandlers[eventName]) {
                dispatchEventHandlers[eventName].forEach(handler => {
                    let eventObject = {
                        preventDefault: () => {
                            prevented = true
                        },
                        data: eventData,
                    };

                    if (handler.call(_this, eventObject) === false) {
                        prevented = true;
                    }
                });
            }

            if (!prevented) {
                attachedToInstance[OOML_INSTANCE_PROPNAME_DISPATCH](attachedToProperty, eventName, eventData);
            }
        },
    });

    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_MUTATIONEVENTLISTENERS, {
        value: {
            arraychange: [],
        },
    });

    Object.defineProperty(_this, "on", {
        value: Object.freeze({
            dispatch: (eventName, handler) => {

                if (!Utils.typeOf(handler, TYPEOF_FUNCTION)) {
                    throw new TypeError(`The dispatch handler for the event "${ eventName }" is not a function`);
                }

                if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
                    throw new TypeError(`Event name is not a string`);
                }

                eventName = eventName.toLocaleLowerCase();

                if (!dispatchEventHandlers[eventName]) {
                    dispatchEventHandlers[eventName] = [];
                }

                dispatchEventHandlers[eventName].push(handler);

                return _this;
            },
            mutation: (eventName, handler) => {

                if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
                    throw new TypeError(`Event name is not a string`);
                }

                if (!Utils.typeOf(handler, TYPEOF_FUNCTION)) {
                    throw new TypeError(`The mutation handler for the event "${ eventName }" is not a function`);
                }

                eventName = eventName.toLocaleLowerCase();

                switch (eventName) {
                    case 'arraychange':
                        _this[OOML_ARRAY_PROPNAME_MUTATIONEVENTLISTENERS].arraychange.push(handler);
                        break;

                    default:
                        throw new ReferenceError(`Invalid mutation event name "${ eventName }"`);
                }

                return _this;
            },
        }),
    });

    Object.defineProperty(_this, "length", {
        get: () => _this[OOML_ARRAY_PROPNAME_INTERNALARRAY].length,
    });

    Object.preventExtensions(_this);
};
var OOMLArrayProto = OOML.Array.prototype;
