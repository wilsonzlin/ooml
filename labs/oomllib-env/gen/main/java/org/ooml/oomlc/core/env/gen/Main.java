package org.ooml.oomlc.core.env.gen;

import org.ooml.oomlc.core.env.gen.Compiling.Java.JavaCompiler;
import org.ooml.oomlc.core.env.gen.Compiling.Java.JavaPackage;
import org.ooml.oomlc.core.env.gen.Lexing.Code;
import org.ooml.oomlc.core.env.gen.Lexing.Lexer;
import org.ooml.oomlc.core.env.gen.Parsing.Parser;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.Namespace.STNamespace;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class Main {
  private static STNamespace parseFile (String filePath) throws FileNotFoundException {
    File file = new File(filePath);

    FileInputStream sourceFile = new FileInputStream(file);
    Code code = new Code(sourceFile);

    Lexer lexer = new Lexer(code);
    Tokens tokens = new Tokens(lexer);

    return Parser.parse(tokens);
  }

  public static void main (String[] args) throws IOException {
    if (args.length < 1) {
      throw new IllegalArgumentException("Malformed arguments");
    }

    Map<String, STNamespace> stNamespaces = new HashMap<>();
    for (int i = 0; i < args.length - 1; i++) {
      String filePath = args[i];
      STNamespace parsed;
      try {
        parsed = parseFile(filePath);
      } catch (Exception e) {
        throw new RuntimeException(String.format("%s\n  while parsing %s", e.toString(), filePath), e);
      }
      stNamespaces.put(filePath, parsed);
    }

    Path outputPath = Paths.get(args[args.length - 1]);
    File output = outputPath.toFile();

    File javaOutputDir = new File(output, "java/org/ooml/oomllib/java/env");
    javaOutputDir.mkdirs();

    JavaPackage javaPackage = JavaCompiler.compileAll(stNamespaces);
    for (Map.Entry<String, String> classCode : javaPackage.generateCode().entrySet()) {
      String name = classCode.getKey();
      String code = classCode.getValue();

      Files.write(
        Paths.get(
          javaOutputDir.getAbsolutePath(),
          name + ".java"),
        Collections.singleton(code),
        Charset.forName("UTF-8"));
    }
  }
}
