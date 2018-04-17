ooml.Instance = function () {
  throw TypeError(`ooml.Instance is an abstract class`);
};

let oomlInstancePrototype = ooml.Instance.prototype = Object.create(ooml.EventSource.prototype);
