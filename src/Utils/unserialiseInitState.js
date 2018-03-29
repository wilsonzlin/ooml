Utils.unserialiseInitState = (instance, initState) => {
  if (initState !== undefined && !Utils.isObjectLiteral(initState)) {
    if (!Utils.typeOf(instance.unserialise, TYPEOF_FUNCTION) || !Utils.isPrimitiveValue(initState)) {
      throw new TypeError(`Invalid OOML instance initial state`);
    }

    initState = instance.unserialise(initState);
    if (!Utils.isObjectLiteral(initState)) {
      throw new TypeError(`Unserialised initial state is not an object`);
    }
  }

  return initState;
};
