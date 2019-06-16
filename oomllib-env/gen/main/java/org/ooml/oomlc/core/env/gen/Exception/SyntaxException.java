package org.ooml.oomlc.core.env.gen.Exception;

import org.ooml.oomlc.core.env.gen.Utils.Position;

public abstract class SyntaxException extends RuntimeException {
  private final Position position;

  public SyntaxException (String message) {
    this(message, null);
  }

  public SyntaxException (String message, Position position) {
    super(message);
    this.position = position;
  }

  @Override
  public String toString () {
    if (position == null) {
      return getMessage();
    }
    return String.format("%s [Line %d, Character %d]", getMessage(), position.getLine(), position.getColumn());
  }
}
