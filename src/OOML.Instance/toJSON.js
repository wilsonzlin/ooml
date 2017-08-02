OOMLInstanceProto.toJSON = function(indentation) {
    if (!Utils.isType("natural", indentation) || indentation < 0 || indentation > 10) {
        throw new RangeError(`Invalid toJSON indentation value`);
    }

    return JSON.stringify(this.toObject(), undefined, indentation);
};
