Utils.parsePropertySubstitution = code => {
    let regexpMatches = /^ this\.(.+?) $/.exec(code);
    if (!regexpMatches) {
        throw new SyntaxError(`Invalid property substitution around "${ code }"`);
    }

    let propName = regexpMatches[1];

    if (!Utils.isValidPropertyName(propName)) {
        throw new SyntaxError(`"${ propName }" is not a valid property name`);
    }

    return propName;
};
