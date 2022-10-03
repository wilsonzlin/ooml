package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STPredicateType extends STType {
  private final String argumentName;
  private final STType type;

  private STPredicateType (Position position, String argumentName, STType type) {
    super(position, TypeType.PREDICATE);
    this.argumentName = argumentName;
    this.type = type;
  }

  public static STPredicateType parsePredicateType (Tokens tokens) {
    Position position = tokens.peek().getPosition();

    String argumentName = STIdentifier.requireIdentifier(tokens);

    tokens.require(TokenType.T_KEYWORD_IS);

    STType type = STType.parseType(tokens);

    return new STPredicateType(position, argumentName, type);
  }

  public String getArgumentName () {
    return argumentName;
  }

  public STType getType () {
    return type;
  }
}
