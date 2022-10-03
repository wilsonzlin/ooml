package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.List;

public class STUnionType extends STType {
  private final List<STType> subtypes;

  public STUnionType (Position position, List<STType> subtypes) {
    super(position, TypeType.UNION);
    this.subtypes = subtypes;
  }

  public List<STType> getSubtypes () {
    return subtypes;
  }
}
