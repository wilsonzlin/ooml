package org.ooml.oomlc.core.env.gen.Compiling.Java;

import org.ooml.oomlc.core.env.gen.Utils.Util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class JavaClass {
  List<String> imports = new ArrayList<>();

  ClassType classType;
  boolean isFinal;
  String name;
  List<JavaGenericParameter> genericParameters = new ArrayList<>();
  List<String> extendsClasses = new ArrayList<>();
  List<String> implementsClasses = new ArrayList<>();

  List<String> enumValues = new ArrayList<>(); // Only for enum class type
  List<JavaClassVariable> variables = new ArrayList<>();
  List<JavaClassConstructor> constructors = new ArrayList<>();
  List<JavaClassMethod> methods = new ArrayList<>();
  List<JavaClass> nestedClasses = new ArrayList<>();

  JavaClass (String name) {
    this(ClassType.REGULAR, name, null);
  }

  JavaClass (ClassType classType, String name) {
    this(classType, name, null);
  }

  JavaClass (String name, JavaGenericParameter[] genericParameters) {
    this(ClassType.REGULAR, name, genericParameters);
  }

  JavaClass (ClassType classType, String name, JavaGenericParameter[] genericParameters) {
    this(classType, name, genericParameters, null);
  }

  JavaClass (ClassType classType, String name, JavaGenericParameter[] genericParameters, String[] extendsClasses) {
    this(classType, name, genericParameters, extendsClasses, null);
  }

  JavaClass (ClassType classType, String name, JavaGenericParameter[] genericParameters, String[] extendsClasses, JavaClassMethod[] methods) {
    this.classType = classType;
    this.name = name;
    if (genericParameters != null) {
      Collections.addAll(this.genericParameters, genericParameters);
    }
    if (extendsClasses != null) {
      Collections.addAll(this.extendsClasses, extendsClasses);
    }
    if (methods != null) {
      Collections.addAll(this.methods, methods);
    }
  }

  @Override
  public String toString () {
    return toString(false, false);
  }

  public String toString (boolean inInterface, boolean isNested) {
    StringBuilder syntax = new StringBuilder();

    syntax
      .append(!inInterface ? "public " : "")
      .append(!inInterface && isNested && (classType == ClassType.REGULAR || classType == ClassType.ABSTRACT) ?
        "static " :
        "")
      .append(isFinal ? "final " : "")
      .append(classType)
      .append(' ')
      .append(name);

    if (!genericParameters.isEmpty()) {
      syntax
        .append("<")
        .append(Util.join(", ", genericParameters))
        .append(">");
    }

    if (!extendsClasses.isEmpty()) {
      syntax
        .append(" extends ")
        .append(Util.join(", ", extendsClasses));
    }

    if (!implementsClasses.isEmpty()) {
      syntax
        .append(" implements ")
        .append(Util.join(", ", implementsClasses));
    }

    syntax.append(" {\n");

    enumValues.sort(null);
    variables.sort(Comparator.comparing(a -> a.name));
    methods.sort(Comparator.comparing(a -> a.name));
    nestedClasses.sort(Comparator.comparing(a -> a.name));

    if (!enumValues.isEmpty()) {
      syntax
        .append(Util.indent(Util.join(", ", Util.map(enumValues, UtilJava::safeEnum))))
        .append(!variables.isEmpty() || !methods.isEmpty() ? ';' : "");
    }

    syntax
      .append(Util.indent(Util.join("\n", variables)))
      .append("\n\n")
      .append(Util.indent(Util.join("\n", constructors)));

    if (classType == ClassType.REGULAR || classType == ClassType.ABSTRACT) {
      // Cheat `super` calls by providing no-parameter constructor
      if (constructors.isEmpty()) {
        // If static class, a private constructor should already exist
        if (classType == ClassType.REGULAR) {
          // TODO
          /*
           * This is tricky:
           *  - Some classes intentionally don't want constructors (e.g. abstract and static classes).
           *  - Some classes don't have their own (e.g. subclasses that inherit constructors).
           *  - Some classes have implicit constructors (e.g. option bags).
           *
           *  For inherited and implicit constructors, a custom constructor needs to be generated.
           */
          syntax
            .append("\n\tpublic ")
            .append(name)
            .append("() {}");
        }
      } else if (UtilJava.find(constructors, c -> c.parameters.isEmpty()) == null) {
        // This still needs to be generated regardless of parents,
        // as there may be classes that extend from this
        syntax
          .append("\n\tprivate ")
          .append(name)
          .append("() {}");
      }
    }

    syntax
      .append("\n\n")
      .append(Util.indent(Util.join("\n", Util.map(methods,
        m -> m.toString(classType == ClassType.INTERFACE)))))
      .append("\n\n")
      .append(Util.indent(Util.join("\n\n", Util.map(nestedClasses,
        n -> n.toString(classType == ClassType.INTERFACE, true)
      ))))
      .append("\n}");

    return syntax.toString()
      .replaceAll("(?m)^\\s+$", "")
      .replaceAll("\\n\\n+", "\n\n")
      .replaceAll("\\n+}", "\n}")
      .replaceAll("\\{\\n+", "{\n");
  }

  public enum ClassType {
    REGULAR("class"), ABSTRACT("abstract class"), INTERFACE("interface"), ENUM("enum"), ANNOTATION("@interface");

    private final String syntax;

    ClassType (String syntax) {
      this.syntax = syntax;
    }

    @Override
    public String toString () {
      return syntax;
    }
  }
}
