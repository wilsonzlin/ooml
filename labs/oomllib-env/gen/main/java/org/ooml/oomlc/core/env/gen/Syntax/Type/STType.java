package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Syntax.STSyntax;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.ArrayList;
import java.util.List;

import static org.ooml.oomlc.core.env.gen.Syntax.Type.STPrimitiveType.Primitive.STRING_TO_PRIMITIVE_MAP;

public abstract class STType extends STSyntax {
  private final TypeType typeType;

  protected STType (Position position, TypeType typeType) {
    super(position);
    this.typeType = typeType;
  }

  public static STType parseReferenceOrGenericOrIndexedType (Tokens tokens) {
    STType type = STReferenceType.parseReferenceType(tokens);

    List<STType> genericArguments = new ArrayList<>();
    Position genericArgumentsPosition = null;

    String query = null;
    Position queryPosition = null;

    if (tokens.peekType() == TokenType.T_LEFT_CHEVRON) {
      genericArgumentsPosition = tokens.accept().getPosition();

      do {
        if (tokens.peekType() == TokenType.T_RIGHT_CHEVRON) {
          break;
        }

        genericArguments.add(STType.parseType(tokens));
      } while (tokens.skipIfNext(TokenType.T_COMMA));

      tokens.require(TokenType.T_RIGHT_CHEVRON);

    } else if (tokens.peekType() == TokenType.T_LEFT_SQUARE_BRACKET &&
               tokens.peekType(2) != TokenType.T_RIGHT_SQUARE_BRACKET) {
      queryPosition = tokens.accept().getPosition();

      query = STIdentifier.requireIdentifier(tokens);
      tokens.require(TokenType.T_RIGHT_SQUARE_BRACKET);
    }

    if (!genericArguments.isEmpty()) {
      type = new STGenericType(genericArgumentsPosition, (STReferenceType) type, genericArguments);

    } else if (query != null) {
      type = new STIndexedType(queryPosition, (STReferenceType) type, query);
    }

    return type;
  }

  public static STType parseType (Tokens tokens) {
    Position position = tokens.peek().getPosition();

    List<STType> subtypes = new ArrayList<>();

    do {
      STType subtype;

      switch (tokens.peekType()) {
      case T_IDENTIFIER:
        String identifierName = tokens.peek().getValue();

        if (STRING_TO_PRIMITIVE_MAP.containsKey(identifierName)) {
          // Primitive type
          subtype = STPrimitiveType.parsePrimitiveType(tokens);

        } else if (STRING_TO_PRIMITIVE_MAP.containsKey(identifierName.toLowerCase())) {
          throw tokens.constructMalformedSyntaxException("Type cannot be the same as a primitive type case-insensitively");

        } else if (tokens.peekType(2) == TokenType.T_KEYWORD_IS) {
          // Predicate type
          subtype = STPredicateType.parsePredicateType(tokens);

        } else {
          // Reference, generic, or indexed type
          subtype = parseReferenceOrGenericOrIndexedType(tokens);
        }
        break;

      case T_LEFT_PARENTHESIS:
        if (tokens.peekType(2) == TokenType.T_RIGHT_PARENTHESIS ||
            tokens.peekType(2) == TokenType.T_ELLIPSIS ||
            tokens.peekType(3) == TokenType.T_COLON ||
            tokens.peekType(3) == TokenType.T_QUESTION_AND_COLON) {
          // Callable type
          subtype = STCallableType.parseCallableType(tokens);
        } else {
          // Grouping
          tokens.skip();
          subtype = STType.parseType(tokens);
          tokens.require(TokenType.T_RIGHT_PARENTHESIS);
        }
        break;

      case T_LEFT_CHEVRON:
        // Callable type
        subtype = STCallableType.parseCallableType(tokens);
        break;

      case T_LEFT_BRACE:
        // Inline interface type
        subtype = STInlineInterfaceType.parseInlineInterfaceType(tokens);
        break;

      case T_LITERAL_STRING:
        subtype = STStringLiteralType.parseStringLiteraltype(tokens);
        break;

      case T_KEYWORD_KEYOF:
        subtype = STKeyofType.parseKeyofType(tokens);
        break;

      case T_KEYWORD_TYPEOF:
        subtype = STTypeofType.parseTypeofType(tokens);
        break;

      case T_KEYWORD_ANY:
        subtype = STAnyType.parseAnyType(tokens);
        break;

      case T_KEYWORD_NEVER:
        subtype = STNeverType.parseNeverType(tokens);
        break;

      case T_KEYWORD_VOID:
        subtype = STVoidType.parseVoidType(tokens);
        break;

      default:
        throw tokens.constructRequiredSyntaxNotFoundException("Expected type");
      }

      while (tokens.peek().getType() == TokenType.T_LEFT_SQUARE_BRACKET) {
        // Array type
        subtype = new STArrayType(tokens.require(TokenType.T_LEFT_SQUARE_BRACKET).getPosition(), subtype);
        tokens.require(TokenType.T_RIGHT_SQUARE_BRACKET);
      }

      subtypes.add(subtype);
    } while (tokens.skipIfNext(TokenType.T_PIPE));

    if (subtypes.size() == 1) {
      return subtypes.get(0);
    }

    return new STUnionType(position, subtypes);
  }

  public TypeType getTypeType () {
    return typeType;
  }

  public enum TypeType {
    ANY,
    ARRAY,
    CALLABLE,
    GENERIC,
    INDEXED,
    INLINE_INTERFACE,
    KEYOF,
    NEVER,
    PREDICATE,
    PRIMITIVE,
    REFERENCE,
    STRING_LITERAL,
    TYPEOF,
    UNION,
    VOID
  }
}
