Utils.getClassFromString = (imports, classes, className) => {
    if (classes[className]) {
        return classes[className];
    }

    let ret = imports[className];

    if (!Utils.isOOMLClass(ret)) {
        throw new ReferenceError(`The class "${ className }" does not exist`);
    }

    return ret;
};
