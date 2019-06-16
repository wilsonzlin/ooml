u_iterate(["toString", "toLocaleString"], method_name => {
  oomlTablePrototype[method_name] = function () {
    return this.toJSON();
  };
});
