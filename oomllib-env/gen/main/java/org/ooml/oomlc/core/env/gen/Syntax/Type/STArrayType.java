package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STArrayType extends STType {
  private final STType elementType;

  public STArrayType (Position position, STType elementType) {
    super(position, TypeType.ARRAY);
    this.elementType = elementType;
  }

  public STType getElementType () {
    return elementType;
  }
}
