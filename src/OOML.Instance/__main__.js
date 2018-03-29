OOML.Instance = function () {
  throw new TypeError(`OOML.Instance is an abstract class`);
};

let OOMLInstanceProto = OOML.Instance.prototype;
