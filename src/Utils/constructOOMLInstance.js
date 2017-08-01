Utils.constructOOMLInstance = (elemConstructor, obj) => {
    if (obj instanceof elemConstructor) {
        return obj;
    }

    // Don't check obj's type or if elemConstructor is OOML.Instance; this will be handled by the constructor
    return new elemConstructor(obj);
};
