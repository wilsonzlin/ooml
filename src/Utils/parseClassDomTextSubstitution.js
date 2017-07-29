Utils.parseClassViewSubstitution = code => {
    let regexpMatches = /^ this\.(.+?) $/.exec(code);
    if (!regexpMatches) {
        // .slice to prevent super-long messages
        throw new SyntaxError(`Invalid property substitution around:\n\n${ code.slice(0, 200) }\n`);
    }

    let propName = regexpMatches[1];

    if (!Utils.isValidPropertyName(propName)) {
        throw new SyntaxError(`"${ propName }" is not a valid property name`);
    }

    return propName;
};
