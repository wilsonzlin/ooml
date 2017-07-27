// TODO Check that indentation is an integer between 0 and 10 (inclusive)
OOMLArrayProto.toJSON = function(startIdx, endIdx, indentation) {
    return JSON.stringify(this.toArray(startIdx, endIdx), undefined, indentation);
};
