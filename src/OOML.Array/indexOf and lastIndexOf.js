['indexOf', 'lastIndexOf'].forEach(methodName => {
    OOMLArrayProto[methodName] = function(elem, fromIdx) {
        if (!(elem instanceof this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR])) {
            throw new TypeError(`Can't find the index of non-element`);
        }

        return this[OOML_ARRAY_PROPNAME_INTERNALARRAY][methodName](elem, fromIdx);
    };
});
