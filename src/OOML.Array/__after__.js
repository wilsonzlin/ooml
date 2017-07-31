for (let methodName in OOMLArrayProtoMutation) {
    OOMLArrayProto[methodName] = function() {
        let _this = this;
        let ret = OOMLArrayProtoMutation[methodName].apply(_this, arguments);
        _this[OOML_ARRAY_PROPNAME_MUTATION_OBSERVERS].arraychange.forEach(handler => {
            handler.call(_this);
        });
        return ret;
    };
}
