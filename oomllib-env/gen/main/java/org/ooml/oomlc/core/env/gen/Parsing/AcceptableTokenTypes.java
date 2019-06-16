package org.ooml.oomlc.core.env.gen.Parsing;

import org.ooml.oomlc.core.env.gen.Utils.Acceptable;

public class AcceptableTokenTypes extends Acceptable<TokenType> {
  public AcceptableTokenTypes (TokenType... tokenTypes) {
    super(tokenTypes);
  }

  public boolean has (Token t) {
    return has(t.getType());
  }
}
