package org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STInterfaceProperty extends STInterfaceBodyUnit {
  private final String name;
  private final STType type;
  private final boolean isReadOnly;
  private final boolean isOptional;

  private STInterfaceProperty (Position position, String name, STType type, boolean isReadOnly, boolean isOptional) {
    super(position);
    this.name = name;
    this.type = type;
    this.isReadOnly = isReadOnly;
    this.isOptional = isOptional;
  }

  public static STInterfaceProperty parseProperty (Tokens tokens) {
    Position position = tokens.peek().getPosition();

    boolean isReadOnly = tokens.skipIfNext(TokenType.T_KEYWORD_READONLY);

    String name = STIdentifier.requireIdentifier(tokens, true);

    boolean isOptional = tokens.skipIfNext(TokenType.T_QUESTION_AND_COLON);
    if (!isOptional) {
      tokens.require(TokenType.T_COLON);
    }

    STType type = STType.parseType(tokens);

    return new STInterfaceProperty(position, name, type, isReadOnly, isOptional);
  }

  public String getName () {
    return name;
  }

  public STType getType () {
    return type;
  }

  public boolean isReadOnly () {
    return isReadOnly;
  }

  public boolean isOptional () {
    return isOptional;
  }
}
