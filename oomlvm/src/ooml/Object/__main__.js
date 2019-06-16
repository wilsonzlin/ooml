ooml.Object = function () {
  throw TypeError(`ooml.Object is an abstract class`);
};

let oomlObjectPrototype = ooml.Object.prototype = Object.create(ooml.EventSource.prototype);
