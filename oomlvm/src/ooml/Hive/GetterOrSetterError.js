ooml.Hive.GetterOrSetterError = function (key, original_error) {
  this.name = `GetterOrSetterError`;
  this.message = `An error was thrown or rejected by a getter or setter on key "${key}"`;
  this.originalError = original_error;
};

ooml.Hive.GetterOrSetterError.prototype = Object.create(Error.prototype);
