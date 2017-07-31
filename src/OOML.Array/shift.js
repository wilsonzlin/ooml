OOMLArrayProtoMutation.shift = function() {
    let arr = this[OOML_ARRAY_PROPNAME_INTERNAL_ARRAY];

    let instanceToDetach = arr.shift();
    if (instanceToDetach) {
        instanceToDetach[OOML_INSTANCE_PROPNAME_DETACH]();
    }

    return instanceToDetach;
};
