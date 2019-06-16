package org.ooml.oomlc.core.env.gen.Syntax.Statement;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STTypeAliasStatement extends STTypingStatement {
  private final String name;
  private final STType type;

  private STTypeAliasStatement (Position position, String name, STType type) {
    super(position, StatementType.TYPE_ALIAS);
    this.name = name;
    this.type = type;
  }

  public static STTypeAliasStatement parseTypeAliasStatement (Tokens tokens) {
    Position position = tokens.require(TokenType.T_KEYWORD_TYPE).getPosition();

    String name = STIdentifier.requireIdentifier(tokens);

    tokens.require(TokenType.T_EQUALS);

    STType type = STType.parseType(tokens);

    return new STTypeAliasStatement(position, name, type);
  }

  @Override
  public String getName () {
    return name;
  }

  public STType getType () {
    return type;
  }
}
