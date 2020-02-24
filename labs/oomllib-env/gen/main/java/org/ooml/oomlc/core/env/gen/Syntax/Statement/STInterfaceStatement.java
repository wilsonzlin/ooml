package org.ooml.oomlc.core.env.gen.Syntax.Statement;

import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.STInterfaceBody;
import org.ooml.oomlc.core.env.gen.Syntax.STGenericParameter;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.ArrayList;
import java.util.List;

import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.T_COMMA;
import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.T_KEYWORD_EXTENDS;
import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.T_KEYWORD_INTERFACE;
import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.T_LEFT_CHEVRON;

public class STInterfaceStatement extends STTypingStatement {
  private final String name;
  private final List<STGenericParameter> genericParameters;
  private final List<STType> parents;
  private final STInterfaceBody interfaceBody;

  private STInterfaceStatement (Position position, String name, List<STGenericParameter> genericParameters, List<STType> parents, STInterfaceBody interfaceBody) {
    super(position, StatementType.INTERFACE);
    this.name = name;
    this.genericParameters = genericParameters;
    this.parents = parents;
    this.interfaceBody = interfaceBody;
  }

  public static STInterfaceStatement parseInterfaceStatement (Tokens tokens) {
    Position position = tokens.require(T_KEYWORD_INTERFACE).getPosition();

    String name = STIdentifier.requireIdentifier(tokens);

    List<STGenericParameter> genericParameters = new ArrayList<>(0);
    if (tokens.peekType() == T_LEFT_CHEVRON) {
      genericParameters = STGenericParameter.parseGenericParameters(tokens);
    }

    List<STType> parents = new ArrayList<>();

    if (tokens.skipIfNext(T_KEYWORD_EXTENDS)) {
      do {
        parents.add(STType.parseReferenceOrGenericOrIndexedType(tokens));
      } while (tokens.skipIfNext(T_COMMA));
    }

    STInterfaceBody intface = STInterfaceBody.parseInterfaceBody(tokens);

    return new STInterfaceStatement(position, name, genericParameters, parents, intface);
  }

  @Override
  public String getName () {
    return name;
  }

  public List<STGenericParameter> getGenericParameters () {
    return genericParameters;
  }

  public List<STType> getParents () {
    return parents;
  }

  public STInterfaceBody getInterfaceBody () {
    return interfaceBody;
  }
}
