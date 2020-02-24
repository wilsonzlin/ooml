package org.ooml.oomlc.core.env.gen.Syntax.Statement;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STSyntax;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public abstract class STStatement extends STSyntax {
  private static final Map<TokenType, Function<Tokens, STStatement>> PARSERS = _createParsersMap();

  private final StatementType statementType;

  protected STStatement (Position position, StatementType statementType) {
    super(position);
    this.statementType = statementType;
  }

  private static Map<TokenType, Function<Tokens, STStatement>> _createParsersMap () {
    Map<TokenType, Function<Tokens, STStatement>> map = new HashMap<>();

    map.put(TokenType.T_KEYWORD_CONST, STVariableStatement::parseVariableStatement);
    map.put(TokenType.T_KEYWORD_VAR, STVariableStatement::parseVariableStatement);
    map.put(TokenType.T_KEYWORD_TYPE, STTypeAliasStatement::parseTypeAliasStatement);
    map.put(TokenType.T_KEYWORD_FUNCTION, STFunctionStatement::parseFunctionStatement);
    map.put(TokenType.T_KEYWORD_NAMESPACE, STNamespaceStatement::parseNamespaceStatement);
    map.put(TokenType.T_KEYWORD_INTERFACE, STInterfaceStatement::parseInterfaceStatement);

    return map;
  }

  public static STStatement parseStatement (Tokens tokens) {
    TokenType nextTokenType = tokens.peekType();

    STStatement statement;

    if (!STStatement.PARSERS.containsKey(nextTokenType)) {
      throw tokens.constructMalformedSyntaxException("Unknown statement");
    }

    statement = STStatement.PARSERS.get(nextTokenType).apply(tokens);

    return statement;
  }

  public abstract String getName ();

  public StatementType getStatementType () {
    return statementType;
  }

  public enum StatementType {
    FUNCTION, TYPE_ALIAS, NAMESPACE, VARIABLE, DECLARATION, INTERFACE
  }
}
