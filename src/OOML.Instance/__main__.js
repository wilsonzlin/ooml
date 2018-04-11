OOML.Instance = function () {
  throw TypeError(`OOML.Instance is an abstract class`);
};

let OOMLInstanceProto = OOML.Instance.prototype;
