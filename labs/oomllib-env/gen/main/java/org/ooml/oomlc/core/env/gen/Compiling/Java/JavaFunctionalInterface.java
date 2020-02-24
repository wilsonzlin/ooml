package org.ooml.oomlc.core.env.gen.Compiling.Java;

import org.ooml.oomlc.core.env.gen.Utils.Util;

class JavaFunctionalInterface extends JavaClass {
  JavaFunctionalInterface (String name, JavaClassMethod signature) {
    this(name, null, signature);
  }

  JavaFunctionalInterface (String name, JavaGenericParameter[] genericParameters, JavaClassMethod signature) {
    super(ClassType.INTERFACE, name, genericParameters);
    methods.add(signature);
  }

  @Override
  public String toString () {
    return toString(false);
  }

  @Override
  public String toString (boolean inInterface, boolean isNested) {
    return toString(inInterface);
  }

  public String toString (boolean inInterface) {
    StringBuilder syntax = new StringBuilder();

    syntax
      .append("@FunctionalInterface\n")
      .append(!inInterface ? "public " : "")
      .append("interface ")
      .append(name);

    if (!genericParameters.isEmpty()) {
      syntax
        .append("<")
        .append(Util.join(", ", genericParameters))
        .append(">");
    }

    syntax
      .append(" {\n\t")
      .append(methods.get(0).toString(true, false))
      .append("\n}");

    return syntax.toString();
  }
}
