Utils.concat = function () {
    let ret;

    if (Utils.isObjectLiteral(arguments[0])) {
        ret = Utils.createCleanObject();
        for (let i = 0; i < arguments.length; i++) {
            let obj = arguments[i];
            if (Utils.isObjectLiteral(obj)) {
                Object.keys(obj).forEach(function(prop) {
                    ret[prop] = obj[prop];
                });
            }
        }
    } else {
        // WARNING: Don't use .concat as that doesn't work with array-like objects
        // e.g. [].concat(NodeList(div, span)) becomes [NodeList], not [div, span]
        ret = Array.prototype.slice.call(arguments[0]);
        for (let i = 1; i < arguments.length; i++) {
            if (arguments[i] && arguments[i].length) {
                Array.prototype.push.apply(ret, arguments[i]);
            }
        }
    }
    return ret;
}