package org.ooml.oomlc.core.env.gen.Parsing;

import org.ooml.oomlc.core.env.gen.Exception.MalformedSyntaxException;
import org.ooml.oomlc.core.env.gen.Exception.RequiredSyntaxNotFoundException;
import org.ooml.oomlc.core.env.gen.Exception.UnexpectedEndOfCodeException;
import org.ooml.oomlc.core.env.gen.Lexing.Lexer;
import org.ooml.oomlc.core.env.gen.Utils.Matchable;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class Tokens implements Matchable<TokenType>, Iterable<Token> {

  private final Lexer lexer;
  private final List<Token> tokens = new ArrayList<>();
  private int lastAcceptedPos = -1;

  public Tokens (Lexer lexer) {
    this.lexer = lexer;
  }

  private Token yieldNextToken () {
    if (lastAcceptedPos < tokens.size() - 1) {
      lastAcceptedPos++;
      return tokens.get(lastAcceptedPos);
    }
    Token token;
    while ((token = lexer.lex()) == null) {
    }
    tokens.add(token);
    lastAcceptedPos++;
    return token;
  }

  public int getState () {
    return lastAcceptedPos;
  }

  public void setState (int lastAcceptedPos) {
    if (lastAcceptedPos < 0 || lastAcceptedPos >= tokens.size()) {
      throw new IllegalArgumentException("Invalid state");
    }
    this.lastAcceptedPos = lastAcceptedPos;
  }

  public void backUp () {
    lastAcceptedPos--;
  }

  private Position getPosition () {
    if (lastAcceptedPos < 0) {
      return new Position(1, 1);
    } else {
      return tokens
        .get(Math.min(lastAcceptedPos + 1, tokens.size() - 1))
        .getPosition();
    }
  }

  public MalformedSyntaxException constructMalformedSyntaxException (String message) {
    return new MalformedSyntaxException(message, getPosition());
  }

  public RequiredSyntaxNotFoundException constructRequiredSyntaxNotFoundException (String message) {
    return new RequiredSyntaxNotFoundException(message, getPosition());
  }

  public Token require (TokenType type) {
    Token t = yieldNextToken();
    if (t.getType() != type) {
      String message = String.format("Required %s, got %s", type, t.getType());
      throw constructRequiredSyntaxNotFoundException(message);
    }
    return t;
  }

  public Token require (AcceptableTokenTypes types) {
    Token t = yieldNextToken();
    if (!types.has(t.getType())) {
      String message = String.format("Unexpected %s", t.getType());
      throw constructRequiredSyntaxNotFoundException(message);
    }
    return t;
  }

  public Token require (Set<TokenType> types) {
    Token t = yieldNextToken();
    if (!types.contains(t.getType())) {
      String message = String.format("Unexpected %s", t.getType());
      throw constructRequiredSyntaxNotFoundException(message);
    }
    return t;
  }

  public Token peek () {
    Token t = yieldNextToken();
    backUp();
    return t;
  }

  public TokenType peekType () {
    return peek().getType();
  }

  public TokenType peekType (int offset) {
    return peek(offset).getType();
  }

  public Token peek (int offset) {
    if (offset < 1) {
      throw new IllegalArgumentException("Invalid offset");
    }

    Token t = null;
    for (int i = 0; i < offset; i++) {
      t = yieldNextToken();
    }
    for (int i = 0; i < offset; i++) {
      backUp();
    }
    return t;
  }

  public Token accept () {
    return yieldNextToken();
  }

  public Token acceptOptional (TokenType type) {
    Token t;
    try {
      t = accept();
    } catch (UnexpectedEndOfCodeException ueoce) {
      return null;
    }
    if (t.getType() != type) {
      backUp();
      return null;
    }
    return t;
  }

  public Token acceptOptional (AcceptableTokenTypes types) {
    Token t = accept();
    if (!types.has(t.getType())) {
      backUp();
      return null;
    }
    return t;
  }

  public void skip () {
    yieldNextToken();
  }

  public boolean skipIfNext (TokenType type) {
    return acceptOptional(type) != null;
  }

  public boolean skipIfNext (AcceptableTokenTypes types) {
    return acceptOptional(types) != null;
  }

  @Override
  public TokenType matcherConsume () {
    return accept().getType();
  }

  @Override
  public void matcherReverse () {
    backUp();
  }

  @Override
  public Iterator<Token> iterator () {
    return tokens.iterator();
  }
}
