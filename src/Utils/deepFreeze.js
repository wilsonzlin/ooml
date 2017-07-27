Utils.deepFreeze = obj => {
    Object.freeze(obj);
    Object.keys(obj).forEach(key => {
        let val = obj[key];
        if (Utils.isObjectLiteral(val) || Array.isArray(val)) {
            Utils.deepFreeze(val);
        }
    });
    return obj;
}