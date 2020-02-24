package org.ooml.oomlc.core.env.gen.Parsing;

import org.ooml.oomlc.core.env.gen.Syntax.Namespace.STNamespace;

public class Parser {
  public static STNamespace parse (Tokens tokens) {
    return STNamespace.parseNamespace(tokens, null);
  }
}
