package org.ooml.oomlc.core.env.gen.Syntax;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.ArrayList;
import java.util.List;

public class STCallable extends STSyntax {
  private final List<STGenericParameter> genericParameters;
  private final List<STCallableParameter> parameters;
  private final STType returnType;

  private STCallable (Position position, List<STGenericParameter> genericParameters, List<STCallableParameter> parameters, STType returnType) {
    super(position);
    this.genericParameters = genericParameters;
    this.parameters = parameters;
    this.returnType = returnType;
  }

  public static STCallable parseCallable (Tokens tokens, TokenType returnTypeDelimiter) {
    Position position = tokens.peek().getPosition();

    List<STGenericParameter> genericParameters = new ArrayList<>(0);
    if (tokens.peekType() == TokenType.T_LEFT_CHEVRON) {
      genericParameters = STGenericParameter.parseGenericParameters(tokens);
    }

    List<STCallableParameter> parameters = STCallableParameter.parseParametersList(tokens);

    tokens.require(returnTypeDelimiter);

    STType returnType = STType.parseType(tokens);

    return new STCallable(position, genericParameters, parameters, returnType);
  }

  public List<STGenericParameter> getGenericParameters () {
    return genericParameters;
  }

  public List<STCallableParameter> getParameters () {
    return parameters;
  }

  public STType getReturnType () {
    return returnType;
  }
}
