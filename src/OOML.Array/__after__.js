for (let methodName in OOMLArrayProtoMutation) {
  OOMLArrayProto[methodName] = function () {
    let _this = this;

    // Call function
    let ret = OOMLArrayProtoMutation[methodName].apply(_this, arguments);

    // Call arraychange mutation event listeners
    if (_this[OOML_ARRAY_PROPNAME_MUTATION_OBSERVERS].arraychange) {
      _this[OOML_ARRAY_PROPNAME_MUTATION_OBSERVERS].arraychange.forEach(handler => {
        handler.call(_this);
      });
    }

    // Return the return value
    return ret;
  };
}
