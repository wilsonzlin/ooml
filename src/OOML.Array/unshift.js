OOMLArrayProtoMutation.unshift = function(newVal) {
    if (newVal === undefined) {
        throw new TypeError(`Attempted to add undefined into OOML.Array`);
    }

    let oomlArray = this;

    let arr = oomlArray[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY],
        insertAfter = oomlArray[OOML_ARRAY_PROPNAME_DOM_ANCHOR];

    let elemConstructor = oomlArray[OOML_ARRAY_PROPNAME_ELEMCONSTRUCTOR];
    let newElem = Utils.constructOOMLInstance(elemConstructor, newVal);
    newElem[OOML_INSTANCE_PROPNAME_ATTACH]({ insertAfter: insertAfter, parent: oomlArray });

    arr.unshift(newElem);

    return oomlArray.length;
};
