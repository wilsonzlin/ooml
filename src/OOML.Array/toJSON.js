OOMLArrayProto.toJSON = function(startIdx, endIdx, indentation) {
    if (!Utils.isType("natural", indentation) || indentation < 0 || indentation > 10) {
        throw new RangeError(`Invalid toJSON indentation value`);
    }

    return JSON.stringify(this.toArray(startIdx, endIdx), undefined, indentation);
};
