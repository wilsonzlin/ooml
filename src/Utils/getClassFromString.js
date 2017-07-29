Utils.getClassFromString = (classes, className) => {
    if (classes[className]) {
        return classes[className];
    }

    throw new ReferenceError(`The class "${ className }" does not exist`);
};
