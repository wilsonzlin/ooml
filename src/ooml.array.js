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
    Object.defineProperty(_this, "length", {
        get: function() { return _this[OOML_ARRAY_PROPNAME_INTERNALARRAY].length; },
    });
};
var OOMLArrayProto = OOML.Array.prototype;
