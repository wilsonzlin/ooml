Utils.parseBindingDeclaration = declaration => {
    let _ = Utils.processBracesSyntaxToPartsAndMap({
        onbracepart: param => {
            let propertyToSubstituteIn = Utils.parsePropertySubstitution(param);
            // TODO Check property is valid (can only be primitive or transient)

            return {
                key: propertyToSubstituteIn,
            };
        },
        syntax: declaration,
    });
    let parts = _.parts;
    let map = _.map;

    let isDynamic = parts.length > 1;
    if (isDynamic) {
        return Object.freeze({
            isDynamic: true,
            parts: parts,
            propertyToPartMap: map,
        });
    } else {
        return Object.freeze({
            isDynamic: false,
            keypath: parts[0],
        });
    }
};
