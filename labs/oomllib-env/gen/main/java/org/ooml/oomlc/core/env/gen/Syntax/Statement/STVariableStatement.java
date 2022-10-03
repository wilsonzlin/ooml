package org.ooml.oomlc.core.env.gen.Syntax.Statement;

import org.ooml.oomlc.core.env.gen.Parsing.Token;
import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STVariableStatement extends STDataStatement {
  private final String name;
  private final STType type;
  private final boolean isReadOnly;

  private STVariableStatement (Position position, String name, STType type, boolean isReadOnly) {
    super(position, StatementType.VARIABLE);
    this.name = name;
    this.type = type;
    this.isReadOnly = isReadOnly;
  }

  public static STVariableStatement parseVariableStatement (Tokens tokens) {
    Token t = tokens.accept();
    Position position = t.getPosition();

    boolean isReadOnly;

    switch (t.getType()) {
    case T_KEYWORD_VAR:
      isReadOnly = false;
      break;

    case T_KEYWORD_CONST:
      isReadOnly = true;
      break;

    default:
      throw tokens.constructRequiredSyntaxNotFoundException("Expected variable or constant declaration");
    }

    String name = STIdentifier.requireIdentifier(tokens);
    tokens.require(TokenType.T_COLON);
    STType type = STType.parseType(tokens);

    return new STVariableStatement(position, name, type, isReadOnly);
  }

  @Override
  public String getName () {
    return name;
  }

  public STType getType () {
    return type;
  }

  public boolean isReadOnly () {
    return isReadOnly;
  }
}
