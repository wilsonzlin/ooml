let Utils_isOOMLClass = c => Utils_typeOf(c, TYPEOF_FUNCTION) && c.prototype instanceof OOML.Instance;
