package org.ooml.oomlc.core.env.gen.Exception;

import org.ooml.oomlc.core.env.gen.Utils.Position;

public class RequiredSyntaxNotFoundException extends MalformedSyntaxException {
  public RequiredSyntaxNotFoundException (String message, Position position) {
    super(message, position);
  }
}
