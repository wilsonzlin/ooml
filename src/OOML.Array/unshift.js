OOMLArrayProtoMutation.unshift = function(newVal) {
    let arr = this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY],
        insertAfter = this[OOML_ARRAY_PROPNAME_DOM_ANCHOR];

    let elemConstructor = this[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
    let newElem = Utils.constructOOMLElementInstance(elemConstructor, newVal);
    newElem[OOML_INSTANCE_PROPNAME_ATTACH]({ insertAfter: insertAfter, parent: this });

    arr.unshift(newElem);

    return this.length;
};
