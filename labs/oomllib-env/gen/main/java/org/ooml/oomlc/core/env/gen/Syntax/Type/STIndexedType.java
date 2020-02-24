package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STIndexedType extends STType {
  private final STReferenceType indexable;
  private final String term;

  public STIndexedType (Position position, STReferenceType indexable, String term) {
    super(position, TypeType.INDEXED);
    this.indexable = indexable;
    this.term = term;
  }

  public STReferenceType getIndexable () {
    return indexable;
  }

  public String getTerm () {
    return term;
  }
}
