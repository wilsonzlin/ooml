package org.ooml.oomlc.core.env.gen.Syntax.Statement;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STCallable;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STFunctionStatement extends STDataStatement {
  private final String name;
  private final STCallable callable;

  private STFunctionStatement (Position position, String name, STCallable callable) {
    super(position, StatementType.FUNCTION);
    this.name = name;
    this.callable = callable;
  }

  public static STFunctionStatement parseFunctionStatement (Tokens tokens) {
    Position position = tokens.require(TokenType.T_KEYWORD_FUNCTION).getPosition();

    String name = STIdentifier.requireIdentifier(tokens);

    STCallable callable = STCallable.parseCallable(tokens, TokenType.T_COLON);

    return new STFunctionStatement(position, name, callable);
  }

  @Override
  public String getName () {
    return name;
  }

  public STCallable getCallable () {
    return callable;
  }
}
