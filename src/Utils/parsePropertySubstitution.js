let Utils_parsePropertySubstitution = code => {
  let regexpMatches = /^ this\.(.+?) $/.exec(code);
  if (!regexpMatches) {
    throw SyntaxError(`Invalid property substitution around "${ code }"`);
  }

  let propName = regexpMatches[1];

  if (!Utils_isValidPropertyName(propName)) {
    throw SyntaxError(`"${ propName }" is not a valid property name`);
  }

  return propName;
};
