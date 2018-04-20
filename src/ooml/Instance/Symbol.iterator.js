if (__compat_Symbol) {
  oomlInstancePrototype[Symbol.iterator] = function () {
    let _this = this;
    let prop_names = _this.constructor[__IP_OOML_CLASS_OWN_COLLAPSED_PROPERTY_NAMES];
    let i = -1;

    return {
      next: () => {
        i++;
        if (i >= prop_names.length) {
          return {
            done: true,
          };
        }

        let prop_name = prop_names[i];

        return {
          value: [prop_name, _this[prop_name]],
          done: false
        };
      }
    };
  };
}
