if (OOMLCompatSymbolExists) {
  OOMLInstanceProto[Symbol.iterator] = function () {
    let inst = this;
    let propNamesIterator = inst.constructor[OOML_CLASS_PROPNAME_PROPNAMES].values();

    return {
      next: () => {
        let it = propNamesIterator.next();
        if (it.done) {
          return it;
        }
        let itValue = it.value;
        return {value: [itValue, inst[itValue]], done: false};
      }
    };
  };
}
