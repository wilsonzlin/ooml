package org.ooml.oomlc.core.env.gen.Syntax;

import org.ooml.oomlc.core.env.gen.Parsing.Token;
import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class STAnnotation {
  public static final Map<TokenType, STAnnotation.Type> ANNOTATION_TYPE_TOKEN_MAP = _createAnnotationTypeTokenMap();

  private final Type type;
  private final String value; // Can be null

  private STAnnotation (Type type, String value) {
    this.type = type;
    this.value = value;
  }

  private static Map<TokenType, STAnnotation.Type> _createAnnotationTypeTokenMap () {
    Map<TokenType, STAnnotation.Type> map = new HashMap<>();

    map.put(TokenType.T_OOML_ANNOTATION_ABSTRACT, Type.ABSTRACT);
    map.put(TokenType.T_OOML_ANNOTATION_INTERFACE, Type.INTERFACE);
    map.put(TokenType.T_OOML_ANNOTATION_MAPTO, Type.MAPTO);
    map.put(TokenType.T_OOML_ANNOTATION_STATIC, Type.STATIC);

    return map;
  }

  public static Collection<STAnnotation> acceptAnnotations (Tokens tokens) {
    List<STAnnotation> annotations = new ArrayList<>();
    while (ANNOTATION_TYPE_TOKEN_MAP.containsKey(tokens.peekType())) {
      Token t = tokens.accept();
      annotations.add(new STAnnotation(
        ANNOTATION_TYPE_TOKEN_MAP.get(t.getType()),
        t.getValue()));
    }
    return annotations;
  }

  public Type getType () {
    return type;
  }

  public String getValue () {
    return value;
  }

  public enum Type {
    ABSTRACT, INTERFACE, MAPTO, STATIC
  }
}
