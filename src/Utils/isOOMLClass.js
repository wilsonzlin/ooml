Utils.isOOMLClass = c => Utils.typeOf(c, TYPEOF_FUNCTION) && c.prototype instanceof OOML.Element;
