package org.ooml.oomlc.core.env.gen.Syntax.Namespace;

import org.ooml.oomlc.core.env.gen.Exception.InternalStateError;
import org.ooml.oomlc.core.env.gen.Exception.MalformedSyntaxException;
import org.ooml.oomlc.core.env.gen.Exception.UnexpectedEndOfCodeException;
import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STCallableOverloads;
import org.ooml.oomlc.core.env.gen.Syntax.Statement.STFunctionStatement;
import org.ooml.oomlc.core.env.gen.Syntax.Statement.STInterfaceStatement;
import org.ooml.oomlc.core.env.gen.Syntax.Statement.STNamespaceStatement;
import org.ooml.oomlc.core.env.gen.Syntax.Statement.STStatement;
import org.ooml.oomlc.core.env.gen.Syntax.Statement.STTypeAliasStatement;
import org.ooml.oomlc.core.env.gen.Syntax.Statement.STVariableStatement;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.HashMap;
import java.util.Map;

import static java.lang.String.format;

public class STNamespace {
  private final Map<String, STType> variables;
  private final Map<String, STCallableOverloads> functions;
  private final Map<String, STType> typeAliases;
  private final Map<String, STInterfaceStatement> interfaces;
  private final Map<String, STNamespace> nestedNamespaces;

  private STNamespace (Map<String, STType> variables, Map<String, STCallableOverloads> functions, Map<String, STType> typeAliases, Map<String, STInterfaceStatement> interfaces, Map<String, STNamespace> nestedNamespaces) {
    this.variables = variables;
    this.functions = functions;
    this.typeAliases = typeAliases;
    this.interfaces = interfaces;
    this.nestedNamespaces = nestedNamespaces;
  }

  public static STNamespace parseNamespace (Tokens tokens, TokenType breakOn) {
    Map<String, STType> variables = new HashMap<>();
    Map<String, STCallableOverloads> functions = new HashMap<>();
    Map<String, STInterfaceStatement> interfaces = new HashMap<>();
    Map<String, STType> typeAliases = new HashMap<>();
    Map<String, STNamespace> nestedNamespaces = new HashMap<>();

    while (true) {
      try {
        if (tokens.peekType() == breakOn) {
          break;
        }
      } catch (UnexpectedEndOfCodeException ueoce) {
        if (breakOn == null) {
          break;
        }
        throw ueoce;
      }

      tokens.skipIfNext(TokenType.T_KEYWORD_DECLARE);

      STStatement statement = STStatement.parseStatement(tokens);
      String name = statement.getName();
      Position position = statement.getPosition();

      tokens.skipIfNext(TokenType.T_SEMICOLON);

      if (statement instanceof STFunctionStatement) {
        if (!functions.containsKey(name)) {
          functions.put(name, new STCallableOverloads());
        }
        functions.get(name).addSignature(((STFunctionStatement) statement).getCallable());

      } else if (statement instanceof STVariableStatement) {
        if (variables.containsKey(name)) {
          throw new MalformedSyntaxException(format("Duplicate variable \"%s\"", name), position);
        }
        variables.put(name, ((STVariableStatement) statement).getType());

      } else if (statement instanceof STInterfaceStatement) {
        if (interfaces.containsKey(name)) {
          throw new MalformedSyntaxException(format("Duplicate interface \"%s\"", name), position);
        }
        interfaces.put(name, (STInterfaceStatement) statement);

      } else if (statement instanceof STTypeAliasStatement) {
        if (typeAliases.containsKey(name)) {
          throw new MalformedSyntaxException(format("Duplicate type alias \"%s\"", name), position);
        }
        typeAliases.put(name, ((STTypeAliasStatement) statement).getType());

      } else if (statement instanceof STNamespaceStatement) {
        if (nestedNamespaces.containsKey(name)) {
          throw new MalformedSyntaxException(format("Duplicate namespace \"%s\"", name), position);
        }
        nestedNamespaces.put(name, ((STNamespaceStatement) statement).getNamespace());

      } else {
        throw new InternalStateError("Unrecognised statement type to add to namespace");
      }
    }

    return new STNamespace(variables, functions, typeAliases, interfaces, nestedNamespaces);
  }

  public Map<String, STType> getVariables () {
    return variables;
  }

  public Map<String, STCallableOverloads> getFunctions () {
    return functions;
  }

  public Map<String, STType> getTypeAliases () {
    return typeAliases;
  }

  public Map<String, STInterfaceStatement> getInterfaces () {
    return interfaces;
  }

  public Map<String, STNamespace> getNestedNamespaces () {
    return nestedNamespaces;
  }
}
