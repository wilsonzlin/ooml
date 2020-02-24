package org.ooml.oomlc.core.env.gen.Compiling.Java;

import org.ooml.oomlc.core.env.gen.Utils.Util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class JavaGenericParameter {
  String name;
  List<JavaType> upperBounds = new ArrayList<>();
  List<JavaType> lowerBounds = new ArrayList<>();

  JavaGenericParameter (String name) {
    this(name, null);
  }

  JavaGenericParameter (String name, JavaType[] upperBounds) {
    this.name = name;
    if (upperBounds != null) {
      Collections.addAll(this.upperBounds, upperBounds);
    }
  }

  @Override
  public String toString () {
    StringBuilder syntax = new StringBuilder();

    syntax
      .append(name);

    if (!upperBounds.isEmpty()) {
      syntax
        .append(" extends ")
        .append(Util.join(" & ", upperBounds));

    } else if (!lowerBounds.isEmpty()) {
      syntax
        .append(" super ")
        .append(Util.join(" & ", lowerBounds));
    }

    return syntax.toString();
  }
}
