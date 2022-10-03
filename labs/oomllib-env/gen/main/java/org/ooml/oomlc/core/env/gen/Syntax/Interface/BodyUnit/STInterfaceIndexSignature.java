package org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STInterfaceIndexSignature extends STInterfaceBodyUnit {
  private final boolean isReadOnly;
  private final String name;
  private final STType type;
  private final STType returnType;

  private STInterfaceIndexSignature (Position position, boolean isReadOnly, String name, STType type, STType returnType) {
    super(position);
    this.isReadOnly = isReadOnly;
    this.name = name;
    this.type = type;
    this.returnType = returnType;
  }

  public static STInterfaceIndexSignature parseIndexSignature (Tokens tokens) {
    Position position = tokens.peek().getPosition();

    boolean isReadOnly = tokens.skipIfNext(TokenType.T_KEYWORD_READONLY);

    tokens.require(TokenType.T_LEFT_SQUARE_BRACKET);

    String name = STIdentifier.requireIdentifier(tokens);

    tokens.require(TokenType.T_COLON);

    STType type = STType.parseType(tokens);

    tokens.require(TokenType.T_RIGHT_SQUARE_BRACKET);

    tokens.require(TokenType.T_COLON);

    STType returnType = STType.parseType(tokens);

    return new STInterfaceIndexSignature(position, isReadOnly, name, type, returnType);
  }

  public boolean isReadOnly () {
    return isReadOnly;
  }

  public String getName () {
    return name;
  }

  public STType getType () {
    return type;
  }

  public STType getReturnType () {
    return returnType;
  }
}
