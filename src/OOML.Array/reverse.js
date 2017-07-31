OOMLArrayProtoMutation.reverse = function() {
    let arr = this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY];
    let lastElem = arr[arr.length - 1][OOML_INSTANCE_PROPNAME_DOMELEM];

    for (let i = 0; i < arr.length - 1; i++) {
        let node = arr[i][OOML_INSTANCE_PROPNAME_DOMELEM];
        node.parentNode.insertBefore(node, lastElem.nextSibling);
    }

    arr.reverse();

    return this;
};
