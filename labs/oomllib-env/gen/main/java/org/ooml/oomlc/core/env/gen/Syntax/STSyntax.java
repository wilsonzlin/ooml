package org.ooml.oomlc.core.env.gen.Syntax;

import org.ooml.oomlc.core.env.gen.Serialising.JSONExc;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public abstract class STSyntax {
  @JSONExc
  private final Position position;
  private final List<STAnnotation> annotations = new ArrayList<>(0);

  public STSyntax (Position position) {
    this.position = position;
  }

  protected static <K extends STSyntax> K addAllAnnotations (K syntax, Collection<STAnnotation> annotation) {
    ((STSyntax) syntax).annotations.addAll(annotation);
    return syntax;
  }

  public final Position getPosition () {
    return position;
  }

  public final boolean hasAnnotation (STAnnotation.Type annotationType) {
    return annotations.stream().anyMatch(a -> a.getType() == annotationType);
  }
}
