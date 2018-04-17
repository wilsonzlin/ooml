u_iterate(["toString", "toLocaleString"], method_name => {
  oomlArrayPrototype[method_name] = function () {
    return this.toJSON();
  };
});
