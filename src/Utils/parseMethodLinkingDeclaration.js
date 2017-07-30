Utils.parseMethodLinkingDeclaration = declaration => {
    let regexpMatches = /^this\.(.+?)$/.exec(declaration);
    if (!regexpMatches) {
        throw new SyntaxError(`Invalid handler method linking around "${ declaration }"`);
    }

    let methodName = regexpMatches[1];

    if (!Utils.isValidPropertyName(methodName)) {
        throw new SyntaxError(`"${ methodName }" is not a valid method name`);
    }

    return methodName;
};
