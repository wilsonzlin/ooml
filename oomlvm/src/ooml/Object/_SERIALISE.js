oomlObjectPrototype[__IP_OOML_OBJ_PROTO_SERIALISE] = function () {
  let _this = this;

  // noinspection JSUnresolvedVariable
  if (u_typeof(_this.serialise, TYPEOF_FUNCTION)) {
    // noinspection JSUnresolvedFunction
    return _this.serialise();

  } else {
    return _this.toJSON();
  }
};
