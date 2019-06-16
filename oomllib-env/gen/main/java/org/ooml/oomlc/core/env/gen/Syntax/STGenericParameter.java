package org.ooml.oomlc.core.env.gen.Syntax;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.ArrayList;
import java.util.List;

public class STGenericParameter extends STSyntax {
  private final String name;
  private final List<STType> bounds;
  private final STType defaultValue; // Can be null

  private STGenericParameter (Position position, String name, List<STType> bounds, STType defaultValue) {
    super(position);
    this.name = name;
    this.bounds = bounds;
    this.defaultValue = defaultValue;
  }

  public static List<STGenericParameter> parseGenericParameters (Tokens tokens) {
    Position position = tokens.require(TokenType.T_LEFT_CHEVRON).getPosition();

    List<STGenericParameter> genericParameters = new ArrayList<>();

    do {
      if (tokens.peekType() == TokenType.T_RIGHT_CHEVRON) {
        break;
      }

      String name = STIdentifier.requireIdentifier(tokens);

      List<STType> bounds = new ArrayList<>();

      if (tokens.skipIfNext(TokenType.T_KEYWORD_EXTENDS)) {
        do {
          bounds.add(STType.parseType(tokens));
        } while (tokens.skipIfNext(TokenType.T_AMPERSAND));
      }

      STType defaultValue = null;
      if (tokens.skipIfNext(TokenType.T_EQUALS)) {
        defaultValue = STType.parseType(tokens);
      }

      genericParameters.add(new STGenericParameter(position, name, bounds, defaultValue));
    } while (tokens.skipIfNext(TokenType.T_COMMA));

    tokens.require(TokenType.T_RIGHT_CHEVRON);

    return genericParameters;
  }

  public String getName () {
    return name;
  }

  public List<STType> getBounds () {
    return bounds;
  }

  public STType getDefaultValue () {
    return defaultValue;
  }
}
