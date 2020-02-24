package org.ooml.oomlc.core.env.gen.Exception;

import org.ooml.oomlc.core.env.gen.Utils.Position;

public class MalformedSyntaxException extends SyntaxException {
  public MalformedSyntaxException (String message, Position position) {
    super(message, position);
  }
}
