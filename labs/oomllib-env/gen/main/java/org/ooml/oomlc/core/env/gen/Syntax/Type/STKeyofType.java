package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STKeyofType extends STType {
  private final STReferenceType enumerable;

  private STKeyofType (Position position, STReferenceType enumerable) {
    super(position, TypeType.KEYOF);
    this.enumerable = enumerable;
  }

  public static STKeyofType parseKeyofType (Tokens tokens) {
    Position position = tokens.require(TokenType.T_KEYWORD_KEYOF).getPosition();

    return new STKeyofType(position, STReferenceType.parseReferenceType(tokens));
  }

  public STReferenceType getEnumerable () {
    return enumerable;
  }
}
