Utils.parseClassDomTextSubstitution = code => {
    let regexpMatches = /^(?: ((?:(?:[a-zA-Z.]+)\|)*[a-zA-Z.]+))? (@)?this\.(.+?) $/.exec(code);
    if (!regexpMatches || !regexpMatches[4]) {
        // .slice to prevent super-long messages
        throw new SyntaxError(`Invalid property declaration around:\n\n${ code.slice(0, 200) }\n`);
    }

    let types = regexpMatches[1] || undefined;
    let propName = regexpMatches[3];
    let isSuppressed = !!regexpMatches[2];

    if (!Utils.isValidPropertyName(propName)) {
        throw new SyntaxError(`"${ propName }" is not a valid property name`);
    }

    if (classMethods[propName]) {
        throw new ReferenceError(`"${ propName }" already exists as a method`);
    }

    if (classElementProperties.has(propName) || classArrayProperties.has(propName)) {
        throw new ReferenceError(`The property "${ propName }" already exists as a element substitution`);
    }

    let propAlreadyExists = !!classProperties[propName];

    if (propAlreadyExists) {
        if (isSuppressed && !classProperties[propName].suppressed) {
            classProperties[propName].suppressed = true;
            classSuppressedProperties.add(propName);
        }

        if (types) {
            if (classProperties[propName].types) {
                if (classProperties[propName].types.join('|') !== types) {
                    throw new ReferenceError(`The types for the property "${ propName }" have already been declared`);
                }
            } else {
                classProperties[propName].types = Utils.parseTypeDeclaration(types);
            }
        }
    } else {
        classProperties[propName] = {
            // types is undefined if not matched in RegExp
            types: types && Utils.parseTypeDeclaration(types),
            isArray: false,
            value: undefined,
            suppressed: isSuppressed,
        };
        if (isSuppressed) {
            classSuppressedProperties.add(propName);
        }
    }

    return {
        isAttribute: isAttribute,
        name: propName,
    };
};
