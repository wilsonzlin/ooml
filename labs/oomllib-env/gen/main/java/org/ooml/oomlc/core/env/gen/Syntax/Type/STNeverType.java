package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STNeverType extends STType {
  private STNeverType (Position position) {
    super(position, TypeType.NEVER);
  }

  public static STNeverType parseNeverType (Tokens tokens) {
    Position position = tokens.require(TokenType.T_KEYWORD_NEVER).getPosition();

    return new STNeverType(position);
  }
}
