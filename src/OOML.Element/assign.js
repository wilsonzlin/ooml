OOMLElementProto.assign = function() {
    let oomlInstance = this;

    for (let i = 0; i < arguments.length; i++) {

        let source = arguments[i];

        // Don't use Object.assign because 1) compatibility 2) it sets non-existent properties
        Object.keys(source).forEach((prop) => oomlInstance[prop] = source[prop]); // Probably don't need to clone as not mutated
    }

    return oomlInstance;
};
