oomlInstancePrototype[__IP_OOML_INST_PROTO_SERIALISE] = function () {
  let _this = this;

  // noinspection JSUnresolvedVariable
  if (u_typeof(_this.serialise, TYPEOF_FUNCTION)) {
    // noinspection JSUnresolvedFunction
    let serialised = _this.serialise();
    if (serialised !== undefined) {
      if (!valid_json_value(serialised)) {
        throw TypeError(`Value returned from serialise function is not JSON compatible`);
      }
      return serialised;
    }

  } else {
    return _this.toObject();
  }
};
