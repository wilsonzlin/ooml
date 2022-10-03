package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STVoidType extends STType {
  private STVoidType (Position position) {
    super(position, TypeType.VOID);
  }

  public static STVoidType parseVoidType (Tokens tokens) {
    Position position = tokens.require(TokenType.T_KEYWORD_VOID).getPosition();

    return new STVoidType(position);
  }
}
