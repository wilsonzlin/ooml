let Utils_parseMethodLinkingDeclaration = declaration => {
  let regexpMatches = /^this\.(.+?)$/.exec(declaration);
  if (!regexpMatches) {
    throw SyntaxError(`Invalid handler method linking around "${ declaration }"`);
  }

  let methodName = regexpMatches[1];

  if (!Utils_isValidPropertyName(methodName)) {
    throw SyntaxError(`"${ methodName }" is not a valid method name`);
  }

  return methodName;
};
