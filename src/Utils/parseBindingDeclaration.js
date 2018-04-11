let Utils_parseBindingDeclaration = declaration => {
  let _ = Utils_processBracesSyntaxToPartsAndMap({
    onbracepart: param => {
      // Whether this property is valid or not is checked by the caller
      let propertyToSubstituteIn = Utils_parsePropertySubstitution(param);

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
