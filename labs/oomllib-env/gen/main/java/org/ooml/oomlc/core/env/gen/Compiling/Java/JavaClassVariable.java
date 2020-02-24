package org.ooml.oomlc.core.env.gen.Compiling.Java;

import java.util.HashMap;
import java.util.Map;

class JavaClassVariable {
  private static final Map<String, String> DEFAULT_VALUES = _createDefaultValuesMap();
  boolean isStatic;
  boolean isFinal;
  JavaType type;
  String name;
  JavaClassVariable (JavaType type, String name) {
    this(false, false, type, name);
  }

  JavaClassVariable (boolean isFinal, JavaType type, String name) {
    this(false, isFinal, type, name);
  }

  JavaClassVariable (boolean isStatic, boolean isFinal, JavaType type, String name) {
    this.isStatic = isStatic;
    this.isFinal = isFinal;
    this.type = type;
    this.name = name;
  }

  private static Map<String, String> _createDefaultValuesMap () {
    Map<String, String> map = new HashMap<>();

    map.put("Number", "0");
    map.put("String", "\"\"");
    map.put("Boolean", "false");

    return map;
  }

  @Override
  public String toString () {
    return "public " +
           (isStatic ? "static " : "") +
           (isFinal ? "final " : "") +
           type +
           ' ' +
           UtilJava.safeIdentifier(name) +
           " = " + DEFAULT_VALUES.get(type.reference) + ";";
  }
}
