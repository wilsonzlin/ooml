package org.ooml.oomlc.core.env.gen.Compiling.Java;

import org.ooml.oomlc.core.env.gen.Utils.Util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.String.format;

public class JavaPackage {
  String name;
  List<JavaClass> classes = new ArrayList<>();

  JavaPackage (String name) {
    this.name = name;
  }

  public Map<String, String> generateCode () {
    Map<String, String> packageCode = new HashMap<>();

    for (JavaClass c : classes) {
      packageCode.put(c.name, "package " + name + ";" +
                              "\n\n" +
                              Util.join("\n", Util.map(c.imports, i -> format("import %s;", i))) +
                              "\n\n" +
                              c.toString(false, false));
    }

    return packageCode;
  }
}
