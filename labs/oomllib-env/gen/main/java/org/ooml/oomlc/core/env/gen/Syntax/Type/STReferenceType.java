package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STReferenceType extends STType {
  private final String reference;

  private STReferenceType (Position position, String reference) {
    super(position, TypeType.REFERENCE);
    this.reference = reference;
  }

  public static STReferenceType parseReferenceType (Tokens tokens) {
    Position position = tokens.peek().getPosition();

    String reference = STIdentifier.requireReference(tokens);

    return new STReferenceType(position, reference);
  }

  public String getReference () {
    return reference;
  }
}
