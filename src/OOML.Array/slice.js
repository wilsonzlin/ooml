OOMLArrayProto.slice = function() {
    return Array.prototype.slice.apply(this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY], arguments);
};
