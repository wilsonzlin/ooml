package org.ooml.oomlc.core.env.gen.Syntax.Statement;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.Namespace.STNamespace;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.T_KEYWORD_NAMESPACE;

public class STNamespaceStatement extends STStatement {
  private final String name;
  private final STNamespace namespace;

  private STNamespaceStatement (Position position, String name, STNamespace namespace) {
    super(position, StatementType.NAMESPACE);
    this.name = name;
    this.namespace = namespace;
  }

  public static STNamespaceStatement parseNamespaceStatement (Tokens tokens) {
    Position position = tokens.require(T_KEYWORD_NAMESPACE).getPosition();

    String name = STIdentifier.requireIdentifier(tokens);

    tokens.require(TokenType.T_LEFT_BRACE);

    STNamespace namespace = STNamespace.parseNamespace(tokens, TokenType.T_RIGHT_BRACE);

    tokens.require(TokenType.T_RIGHT_BRACE);

    return new STNamespaceStatement(position, name, namespace);
  }

  @Override
  public String getName () {
    return name;
  }

  public STNamespace getNamespace () {
    return namespace;
  }
}
