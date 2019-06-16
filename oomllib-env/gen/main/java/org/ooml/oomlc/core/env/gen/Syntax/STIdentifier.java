package org.ooml.oomlc.core.env.gen.Syntax;

import org.ooml.oomlc.core.env.gen.Exception.RequiredSyntaxNotFoundException;
import org.ooml.oomlc.core.env.gen.Parsing.Token;
import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;

import java.util.HashMap;
import java.util.Map;

import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.*;

public class STIdentifier {
  private static final Map<TokenType, String> RESERVED_KEYWORD_AS_IDENTIFIER = _createReservedKeywordAsIdentifierMap();

  private STIdentifier () {
  }

  private static Map<TokenType, String> _createReservedKeywordAsIdentifierMap () {
    Map<TokenType, String> map = new HashMap<>();

    map.put(T_KEYWORD_TYPE, "type");
    map.put(T_KEYWORD_IS, "is");
    map.put(T_KEYWORD_EXTENDS, "extends");
    map.put(T_KEYWORD_DECLARE, "declare");
    map.put(T_KEYWORD_READONLY, "readonly");
    map.put(T_KEYWORD_NAMESPACE, "namespace");

    return map;
  }

  public static String requireReference (Tokens tokens) {
    StringBuilder value = new StringBuilder();

    do {
      value
        .append(requireIdentifier(tokens))
        .append('.');
    } while (tokens.skipIfNext(T_DOT));

    return value.deleteCharAt(value.length() - 1).toString();
  }

  public static String requireIdentifier (Tokens tokens, boolean canBeString) {
    Token nextToken = tokens.accept();
    String value;

    if (RESERVED_KEYWORD_AS_IDENTIFIER.containsKey(nextToken.getType())) {
      value = RESERVED_KEYWORD_AS_IDENTIFIER.get(nextToken.getType());

    } else if (nextToken.getType() == T_IDENTIFIER) {
      value = nextToken.getValue();

    } else if (nextToken.getType() == T_LITERAL_STRING && canBeString) {
      value = nextToken.getValue();

    } else {
      throw new RequiredSyntaxNotFoundException("Required identifier", nextToken.getPosition());
    }

    return value;
  }

  public static String requireIdentifier (Tokens tokens) {
    return requireIdentifier(tokens, false);
  }
}
