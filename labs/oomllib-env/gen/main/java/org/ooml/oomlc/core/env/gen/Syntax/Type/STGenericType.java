package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.List;

public class STGenericType extends STType {
  private final STReferenceType referenceType;
  private final List<STType> genericArguments;

  public STGenericType (Position position, STReferenceType referenceType, List<STType> genericArguments) {
    super(position, TypeType.GENERIC);
    this.referenceType = referenceType;
    this.genericArguments = genericArguments;
  }

  public STReferenceType getReferenceType () {
    return referenceType;
  }

  public List<STType> getGenericArguments () {
    return genericArguments;
  }
}
