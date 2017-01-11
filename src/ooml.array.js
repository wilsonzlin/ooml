OOML.Array = function(elementConstructor, insertAfterDomElem) {
    var _this = this;

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

    Object.defineProperty(_this, OOML_ARRAY_PROPNAME_MUTATIONEVENTLISTENERS, {
        value: {
            arraychange: [],
        },
    });

    Object.defineProperty(_this, "on", {
        value: Object.freeze({
            mutation: function(eventName, handler) {
                switch (eventName) {
                    case 'arraychange':
                        if (typeof handler != 'function') {
                            throw new TypeError(`The mutation handler for the event "${ eventName }" is not a function`);
                        }
                        _this[OOML_ARRAY_PROPNAME_MUTATIONEVENTLISTENERS].arraychange.push(handler);
                        break;

                    default:
                        throw new SyntaxError(`Invalid mutation event name "${ eventName }"`);
                }

                return _this;
            },
        }),
    });

    Object.defineProperty(_this, "length", {
        get: function() { return _this[OOML_ARRAY_PROPNAME_INTERNALARRAY].length; },
    });

    Object.preventExtensions(_this);
};
var OOMLArrayProto = OOML.Array.prototype;
