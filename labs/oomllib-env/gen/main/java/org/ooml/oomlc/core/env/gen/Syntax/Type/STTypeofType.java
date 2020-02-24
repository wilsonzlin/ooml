package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STTypeofType extends STType {
  private final STType capture;

  private STTypeofType (Position position, STType capture) {
    super(position, TypeType.TYPEOF);
    this.capture = capture;
  }

  public static STTypeofType parseTypeofType (Tokens tokens) {
    Position position = tokens.require(TokenType.T_KEYWORD_TYPEOF).getPosition();

    return new STTypeofType(position, STType.parseType(tokens));
  }

  public STType getCapture () {
    return capture;
  }
}
