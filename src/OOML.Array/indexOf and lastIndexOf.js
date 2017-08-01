['indexOf', 'lastIndexOf'].forEach(methodName => {
    OOMLArrayProto[methodName] = function(elem, fromIdx) {
        let _this = this;

        if (!(elem instanceof _this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR])) {
            throw new TypeError(`Can't find the index of non-element`);
        }

        return _this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY][methodName](elem, fromIdx);
    };
});
