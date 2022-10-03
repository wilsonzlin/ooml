package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.Token;
import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STStringLiteralType extends STType {
  private final String value;

  private STStringLiteralType (Position position, String value) {
    super(position, TypeType.STRING_LITERAL);
    this.value = value;
  }

  public static STStringLiteralType parseStringLiteraltype (Tokens tokens) {
    Token t = tokens.require(TokenType.T_LITERAL_STRING);
    return new STStringLiteralType(t.getPosition(), t.getValue());
  }

  public String getValue () {
    return value;
  }
}
