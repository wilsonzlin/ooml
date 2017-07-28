Utils.getDefaultPrimitiveValueForTypes = types => {
    if (!types || ~types.indexOf('null')) {
        return null;
    } else if (~types.indexOf('natural') || ~types.indexOf('integer') || ~types.indexOf('float') || ~types.indexOf('number')) {
        return 0;
    } else if (~types.indexOf('boolean')) {
        return false;
    } else if (~types.indexOf('string')) {
        return '';
    } else {
        throw new Error(`Unknown type "${types}"`);
    }
};
