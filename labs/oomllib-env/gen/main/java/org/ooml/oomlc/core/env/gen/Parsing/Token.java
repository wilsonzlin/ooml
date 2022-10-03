package org.ooml.oomlc.core.env.gen.Parsing;

import org.ooml.oomlc.core.env.gen.Utils.Position;

public class Token {
  private final TokenType type;
  private final String value;
  // Position refers to the end of the token
  private final Position position;

  public Token (TokenType type, Position position) {
    this.type = type;
    this.value = null;
    this.position = position;
  }

  public Token (TokenType type, String value, Position position) {
    this.type = type;
    this.value = value;
    this.position = position;
  }

  public TokenType getType () {
    return type;
  }

  public String getValue () {
    return value;
  }

  public Position getPosition () {
    return position;
  }
}
