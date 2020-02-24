package org.ooml.oomlc.core.env.gen.Compiling.Java;

import org.ooml.oomlc.core.env.gen.Utils.Util;

import java.util.ArrayList;
import java.util.List;

class JavaClassConstructor {
  boolean isPrivate;
  String className;
  List<JavaClassMethodParameter> parameters = new ArrayList<>();

  JavaClassConstructor (boolean isPrivate, String className) {
    this.isPrivate = isPrivate;
    this.className = className;
  }

  JavaClassConstructor (String className) {
    this.className = className;
  }

  @Override
  public String toString () {
    return (isPrivate ? "private" : "public") +
           ' ' +
           className +
           "(" +
           Util.join(", ", parameters) +
           ") {}";
  }
}
