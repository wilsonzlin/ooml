package org.ooml.oomlc.core.env.gen.Compiling.Java;

import org.ooml.oomlc.core.env.gen.Utils.Util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class JavaClassMethod {
  boolean isStatic;
  List<JavaGenericParameter> genericParameters = new ArrayList<>();
  JavaType returnType;
  String name;
  List<JavaClassMethodParameter> parameters = new ArrayList<>();

  JavaClassMethod (JavaType returnType, String name) {
    this(false, null, returnType, name);
  }

  JavaClassMethod (JavaGenericParameter[] genericParameters, JavaType returnType, String name) {
    this(false, genericParameters, returnType, name);
  }

  JavaClassMethod (boolean isStatic, JavaGenericParameter[] genericParameters, JavaType returnType, String name) {
    this(isStatic, genericParameters, returnType, name, null);
  }

  JavaClassMethod (boolean isStatic, JavaGenericParameter[] genericParameters, JavaType returnType, String name, JavaClassMethodParameter[] parameters) {
    this.isStatic = isStatic;
    if (genericParameters != null) {
      Collections.addAll(this.genericParameters, genericParameters);
    }
    this.returnType = returnType;
    this.name = name;
    if (parameters != null) {
      Collections.addAll(this.parameters, parameters);
    }
  }

  @Override
  public String toString () {
    return toString(false);
  }

  public String toString (boolean inInterface) {
    return toString(inInterface, true);
  }

  public String toString (boolean inInterface, boolean isDefault) {
    StringBuilder syntax = new StringBuilder();

    syntax
      .append(!inInterface ? "public " : "")
      .append(inInterface && !isStatic && isDefault ? "default " : "")
      .append(!inInterface || isStatic ? "native " : "")
      .append(isStatic ? "static " : "");

    if (!genericParameters.isEmpty()) {
      syntax
        .append('<')
        .append(Util.join(", ", genericParameters))
        .append("> ");
    }

    syntax
      .append(returnType.toString(true))
      .append(' ')
      .append(UtilJava.safeIdentifier(name));

    syntax
      .append(' ')
      .append("(")
      .append(Util.join(", ", parameters))
      .append(")");

    if (!inInterface || isStatic || !isDefault) {
      syntax.append(';');

    } else {
      if (returnType.reference.equals("void")) {
        syntax.append(" {}");
      } else {
        syntax.append(" { return null; }");
      }
    }

    return syntax.toString();
  }
}
