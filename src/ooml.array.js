OOML.Array = function(elementConstructor, insertAfterDomElem) {
    var internalArray = [];

    Object.defineProperty(this, OOML_ARRAY_PROPNAME_INTERNALARRAY, {
        get: function() { return internalArray; },
        set: function(newInternalArray) { internalArray = newInternalArray; }, // For .initialize(); NOTE: need to do get and set as otherwise internalArray variable is not updated (only OOML_ARRAY_PROPNAME_INTERNALARRAY property)
    });
    Object.defineProperty(this, OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR, {
        value: elementConstructor,
    });
    Object.defineProperty(this, OOML_ARRAY_PROPNAME_INSERTAFTERDOMELEM, {
        value: insertAfterDomElem,
    });
    Object.defineProperty(this, "length", {
        get: function() { return internalArray.length; },
    });
};
var OOMLArrayProto = OOML.Array.prototype;
