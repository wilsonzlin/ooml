package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STAnyType extends STType {
  private STAnyType (Position position) {
    super(position, TypeType.ANY);
  }

  public static STAnyType parseAnyType (Tokens tokens) {
    Position position = tokens.require(TokenType.T_KEYWORD_ANY).getPosition();

    return new STAnyType(position);
  }
}
