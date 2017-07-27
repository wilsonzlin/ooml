OOML.Element = function() {
    throw new TypeError(`OOML.Element is an abstract class`);
};

let OOMLElementProto = OOML.Element.prototype;
