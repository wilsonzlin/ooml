package org.ooml.oomlc.core.env.gen.Syntax;

import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.ArrayList;
import java.util.List;

import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.*;

public class STCallableParameter extends STSyntax {
  private final String name;
  private final STType type;
  private final boolean optional;
  private final boolean variableLength;

  public STCallableParameter (Position position, String name, STType type, boolean optional, boolean variableLength) {
    super(position);
    this.name = name;
    this.type = type;
    this.optional = optional;
    this.variableLength = variableLength;
  }

  private static STCallableParameter parseParameter (Tokens tokens) {
    Position position = tokens.peek().getPosition();

    boolean variableLength = tokens.skipIfNext(T_ELLIPSIS);
    String name = STIdentifier.requireIdentifier(tokens);

    boolean optional = tokens.skipIfNext(T_QUESTION_AND_COLON);
    if (!optional) {
      tokens.require(T_COLON);
    }

    STType type = STType.parseType(tokens);

    return new STCallableParameter(position, name, type, optional, variableLength);
  }

  public static List<STCallableParameter> parseParametersList (Tokens tokens) {
    List<STCallableParameter> parameters = new ArrayList<>();

    tokens.require(T_LEFT_PARENTHESIS);

    do {
      // Allow parameters to end with comma
      // No arguments is valid
      if (tokens.peekType() == T_RIGHT_PARENTHESIS) {
        break;
      }

      parameters.add(parseParameter(tokens));
    } while (tokens.skipIfNext(T_COMMA));

    tokens.require(T_RIGHT_PARENTHESIS);

    return parameters;
  }

  public String getName () {
    return name;
  }

  public STType getType () {
    return type;
  }

  public boolean isOptional () {
    return optional;
  }

  public boolean isVariableLength () {
    return variableLength;
  }
}
