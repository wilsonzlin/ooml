Utils.isValidPropertyName = name =>
    Utils.typeOf(name, TYPEOF_STRING) &&
    !!name.length &&
    name[0] != '$' &&
    // Double underscore prefix
    !(name[0] == '_' && name[1] == '_') &&
    // Starting or trailing whitespace
    !/^\s|\s$/.test(name) &&
    OOMLReservedPropertyNames.indexOf(name) == -1