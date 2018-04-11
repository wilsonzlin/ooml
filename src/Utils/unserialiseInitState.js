let Utils_unserialiseInitState = (instance, initState) => {
  if (initState !== undefined && !Utils_isObjectLiteral(initState)) {
    if (!Utils_typeOf(instance.unserialise, TYPEOF_FUNCTION) || !Utils_isPrimitiveValue(initState)) {
      throw TypeError(`Invalid OOML instance initial state`);
    }

    initState = instance.unserialise(initState);
    if (!Utils_isObjectLiteral(initState)) {
      throw TypeError(`Unserialised initial state is not an object`);
    }
  }

  return initState;
};
