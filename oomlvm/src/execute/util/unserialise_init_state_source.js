let unserialise_init_state_source = (ooml_class, init_state_source) => {
  // Also covers null
  if (init_state_source == undefined) {
    return;
  }

  // Null already checked for
  if (!u_typeof(init_state_source, TYPEOF_OBJECT)) {
    // noinspection JSUnresolvedVariable
    if (!u_typeof(ooml_class.unserialise, TYPEOF_FUNCTION)) {
      throw TypeError(`Invalid initial state`);
    }

    // noinspection JSUnresolvedFunction
    init_state_source = ooml_class.unserialise(init_state_source);
    // Unserialise can return undefined/null
    if (init_state_source != undefined && !u_typeof(init_state_source, TYPEOF_OBJECT)) {
      throw TypeError(`Invalid unserialised initial state`);
    }
  }

  return init_state_source;
};
