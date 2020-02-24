package org.ooml.oomlc.core.env.gen.Lexing;

import org.ooml.oomlc.core.env.gen.Parsing.Token;
import org.ooml.oomlc.core.env.gen.Parsing.TokenType;

import java.util.HashMap;
import java.util.Map;

import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.*;

public class Lexer {
  private static final AcceptableChars LINE_TERMINATOR = new AcceptableChars('\r', '\n');
  private static final AcceptableChars WHITESPACE = new AcceptableChars('\r', '\n', '\t', ' ');

  private static final AcceptableChars IDENTIFIER_STARTER = new AcceptableChars("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$");
  private static final AcceptableChars IDENTIFIER = new AcceptableChars("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$0123456789");

  private static final Map<String, TokenType> SPECIAL_IDENTIFIER = _createSpecialIdentifierMap();
  private static final Map<String, TokenType> OOML_ANNOTATION = _createOomlAnnotationMap();
  private static final OperatorTreeNode OPERATOR_TREE_ROOT_NODE = _createOperatorTreeRootNode();
  private final Code code;

  public Lexer (Code code) {
    this.code = code;
  }

  private static Map<String, TokenType> _createOomlAnnotationMap () {
    Map<String, TokenType> map = new HashMap<>();

    map.put("abstract", T_OOML_ANNOTATION_ABSTRACT);
    map.put("interface", T_OOML_ANNOTATION_INTERFACE);
    map.put("mapto", T_OOML_ANNOTATION_MAPTO);
    map.put("static", T_OOML_ANNOTATION_STATIC);

    return map;
  }

  private static OperatorTreeNode _createOperatorTreeRootNode () {
    Map<String, TokenType> sequences = new HashMap<>();

    sequences.put("...", T_ELLIPSIS);
    sequences.put("(", T_LEFT_PARENTHESIS);
    sequences.put(")", T_RIGHT_PARENTHESIS);
    sequences.put("[", T_LEFT_SQUARE_BRACKET);
    sequences.put("]", T_RIGHT_SQUARE_BRACKET);
    sequences.put("<", T_LEFT_CHEVRON);
    sequences.put(">", T_RIGHT_CHEVRON);
    sequences.put("{", T_LEFT_BRACE);
    sequences.put("}", T_RIGHT_BRACE);

    sequences.put(".", T_DOT);
    sequences.put(":", T_COLON);
    sequences.put("?:", T_QUESTION_AND_COLON);
    sequences.put("?.", T_QUESTION_AND_DOT);
    sequences.put("=>", T_EQUALS_AND_RIGHT_CHEVRON);
    sequences.put("=", T_EQUALS);

    sequences.put("&", T_AMPERSAND);
    sequences.put("|", T_PIPE);

    sequences.put(",", T_COMMA);
    sequences.put(";", T_SEMICOLON);

    OperatorTreeNode rootNode = new OperatorTreeNode();

    for (Map.Entry<String, TokenType> operator : sequences.entrySet()) {
      rootNode.addSequence(operator
        .getKey()
        .toCharArray(), 0, operator.getValue());
    }

    return rootNode;
  }

  private static Map<String, TokenType> _createSpecialIdentifierMap () {
    Map<String, TokenType> map = new HashMap<>();

    map.put("any", T_KEYWORD_ANY);
    map.put("const", T_KEYWORD_CONST);
    map.put("declare", T_KEYWORD_DECLARE);
    map.put("extends", T_KEYWORD_EXTENDS);
    map.put("function", T_KEYWORD_FUNCTION);
    map.put("interface", T_KEYWORD_INTERFACE);
    map.put("is", T_KEYWORD_IS);
    map.put("keyof", T_KEYWORD_KEYOF);
    map.put("namespace", T_KEYWORD_NAMESPACE);
    map.put("never", T_KEYWORD_NEVER);
    map.put("new", T_KEYWORD_NEW);
    map.put("readonly", T_KEYWORD_READONLY);
    map.put("type", T_KEYWORD_TYPE);
    map.put("typeof", T_KEYWORD_TYPEOF);
    map.put("var", T_KEYWORD_VAR);
    map.put("void", T_KEYWORD_VOID);

    return map;
  }

  private Token constructToken (TokenType type) {
    return new Token(type, code.getCurrentPosition());
  }

  private Token constructToken (TokenType type, String value) {
    return new Token(type, value, code.getCurrentPosition());
  }

  public Token lex () {
    char nextChar = code.peek();

    Token t = null;

    if (nextChar == '/') {
      if (code.peek(2) == '*') {
        if (code.peek(3) == '!') {
          t = lexOomlAnnotation();
        } else {
          lexMLComment();
        }
      } else {
        lexSLComment();
      }

    } else if (OPERATOR_TREE_ROOT_NODE.hasChild(nextChar)) {
      TokenType tokenType = OPERATOR_TREE_ROOT_NODE.match(code);
      if (tokenType == null) {
        throw code.constructMalformedSyntaxException("Invalid syntax");
      }
      t = constructToken(tokenType);

    } else if (nextChar == '"') {
      t = lexLiteralString();

    } else if (IDENTIFIER_STARTER.has(nextChar)) {
      t = lexIdentifier();

    } else if (WHITESPACE.has(nextChar)) {
      code.skipGreedyBeforeEnd(WHITESPACE);

    } else {
      throw code.constructMalformedSyntaxException("Unknown syntax");
    }

    return t;
  }

  // This is called when starting literal (at char '"')
  private Token lexLiteralString () {
    code.skip();
    String value = code.acceptUntil('"');
    code.skip();
    return constructToken(T_LITERAL_STRING, value);
  }

  // Called when next char is in IDENTIFIER_STARTER
  private Token lexIdentifier () {
    String value = code.acceptGreedy(IDENTIFIER);

    if (SPECIAL_IDENTIFIER.containsKey(value)) {
      TokenType specialIdentifierType = SPECIAL_IDENTIFIER.get(value);
      return constructToken(specialIdentifierType);

    } else {
      return constructToken(T_IDENTIFIER, value);
    }
  }

  // Called when next char is '/'
  private void lexSLComment () {
    code.skip();
    code.skipUntil(LINE_TERMINATOR);
    code.skip();
  }

  // Called when next char is '/*'
  private void lexMLComment () {
    code.skip();
    code.skip();
    while (true) {
      code.skipUntil('*');
      code.skip();
      if (code.skipIfNext('/')) {
        break;
      }
    }
  }

  // Called when next char is '/*!'
  private Token lexOomlAnnotation () {
    code.skip(3);

    String prefix = code.acceptUntil('-').trim();
    if (!prefix.startsWith("@ooml")) {
      throw code.constructMalformedSyntaxException("Invalid ooml annotation");
    }
    code.skip();

    StringBuilder type = new StringBuilder();
    while (Character.isAlphabetic(code.peek())) {
      type.append(code.accept());
    }

    TokenType t = OOML_ANNOTATION.get(type.toString());
    if (t == null) {
      throw code.constructMalformedSyntaxException("Invalid ooml annotation");
    }

    String value = null;
    if (code.skipIfNext('(')) {
      value = code.acceptUntil(')');
      code.skip();
    }

    code.skipUntil('*');
    code.skip(2);

    return constructToken(t, value);
  }
}
