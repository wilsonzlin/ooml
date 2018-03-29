Utils.parseTypeDeclaration = types => types.split("|")
  .filter((type, idx, types) => {
    if (!OOMLPrimitiveTypes.has(type)) {
      throw new SyntaxError(`Invalid type declaration "${ type }"`);
    }
    if (types.indexOf(type) !== idx) {
      throw new SyntaxError(`Duplicate type "${ type }" in type declaration`);
    }

    // There can only be one number type
    // If current type is a number type and there exists another number type...
    if (OOMLPrimitiveNumberTypes.has(type) && types.some((t, i) => i != idx && OOMLPrimitiveNumberTypes.has(t))) {
      throw new SyntaxError(`Illegal type declaration "${ type }"`);
    }
    return true;
  });
