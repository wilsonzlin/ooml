let Utils_parseTypeDeclaration = types => types.split("|")
  .filter((type, idx, types) => {
    if (!OOMLPrimitiveTypes.has(type)) {
      throw SyntaxError(`Invalid type declaration "${ type }"`);
    }
    if (types.indexOf(type) !== idx) {
      throw SyntaxError(`Duplicate type "${ type }" in type declaration`);
    }

    // There can only be one number type
    // If current type is a number type and there exists another number type...
    if (OOMLPrimitiveNumberTypes.has(type) && types.some((t, i) => i != idx && OOMLPrimitiveNumberTypes.has(t))) {
      throw SyntaxError(`Illegal type declaration "${ type }"`);
    }
    return true;
  });
