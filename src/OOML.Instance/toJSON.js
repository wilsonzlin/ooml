// TODO Check that indentation is an integer between 0 and 10 (inclusive)
OOMLInstanceProto.toJSON = function(indentation) {
    return JSON.stringify(this.toObject(), undefined, indentation);
};
