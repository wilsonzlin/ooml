package org.ooml.oomlc.core.env.gen.Compiling.Java;

class JavaClassMethodParameter {
  boolean isVariableLength;
  String name;
  JavaType type;

  JavaClassMethodParameter (String name, JavaType type) {
    this(false, name, type);
  }

  JavaClassMethodParameter (boolean isVariableLength, String name, JavaType type) {
    this.isVariableLength = isVariableLength;
    this.name = name;
    this.type = type;
  }

  @Override
  public String toString () {
    return String.valueOf(type) +
           ' ' +
           (isVariableLength ? "..." : "") +
           UtilJava.safeIdentifier(name);
  }
}
