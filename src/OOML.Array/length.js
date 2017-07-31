Object.defineProperty(OOMLArrayProto, "length", {
    get: function(){
        return this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY].length;
    }
});
