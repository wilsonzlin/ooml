package org.ooml.oomlc.core.env.gen.Syntax.Interface;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceCallSignature;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceConstructor;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceIndexSignature;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceMethod;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceProperty;
import org.ooml.oomlc.core.env.gen.Syntax.STAnnotation;
import org.ooml.oomlc.core.env.gen.Syntax.STSyntax;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.*;

public class STInterfaceBody extends STSyntax {
  private final List<STInterfaceCallSignature> callSignatures;
  private final STInterfaceIndexSignature indexSignature; // Can be null
  private final List<STInterfaceConstructor> constructors;
  private final Map<String, STInterfaceProperty> properties;
  private final List<STInterfaceMethod> methods;

  private STInterfaceBody (Position position, List<STInterfaceCallSignature> callSignatures, STInterfaceIndexSignature indexSignature, List<STInterfaceConstructor> constructors, Map<String, STInterfaceProperty> properties, List<STInterfaceMethod> methods) {
    super(position);
    this.callSignatures = callSignatures;
    this.indexSignature = indexSignature;
    this.constructors = constructors;
    this.properties = properties;
    this.methods = methods;
  }

  public static STInterfaceBody parseInterfaceBody (Tokens tokens) {
    Collection<STAnnotation> interfaceAnnotations = STAnnotation.acceptAnnotations(tokens);

    Position position = tokens.require(T_LEFT_BRACE).getPosition();

    List<STInterfaceCallSignature> callSignatures = new ArrayList<>();
    STInterfaceIndexSignature indexSignature = null;
    List<STInterfaceConstructor> constructors = new ArrayList<>();
    Map<String, STInterfaceProperty> properties = new HashMap<>();
    List<STInterfaceMethod> methods = new ArrayList<>();

    TokenType nextTokenType;
    while ((nextTokenType = tokens.peekType()) != T_RIGHT_BRACE) {
      STInterfaceProperty property = null;

      Collection<STAnnotation> bodyUnitAnnotations = STAnnotation.acceptAnnotations(tokens);

      Collection destination = null;
      STSyntax unit;

      switch (nextTokenType) {
      case T_KEYWORD_READONLY:
        if (tokens.peekType(2) == T_LEFT_SQUARE_BRACKET) {
          unit = indexSignature = STInterfaceIndexSignature.parseIndexSignature(tokens);
        } else {
          unit = property = STInterfaceProperty.parseProperty(tokens);
        }
        break;

      case T_LEFT_CHEVRON:
        destination = callSignatures;
        unit = STInterfaceCallSignature.parseCallSignature(tokens);
        break;

      case T_KEYWORD_NEW:
        destination = constructors;
        unit = STInterfaceConstructor.parseConstructor(tokens);
        break;

      case T_LEFT_PARENTHESIS:
        destination = callSignatures;
        unit = STInterfaceCallSignature.parseCallSignature(tokens);
        break;

      case T_LEFT_SQUARE_BRACKET:
        unit = indexSignature = STInterfaceIndexSignature.parseIndexSignature(tokens);
        break;

      default:
        // Both branches will throw exception if not valid
        if (tokens.peekType(2) == T_LEFT_PARENTHESIS ||
            tokens.peekType(2) == T_LEFT_CHEVRON) {
          destination = methods;
          unit = STInterfaceMethod.parseMethod(tokens);

        } else {
          unit = property = STInterfaceProperty.parseProperty(tokens);
        }
      }

      tokens.require(T_SEMICOLON);

      STSyntax.addAllAnnotations(unit, bodyUnitAnnotations);

      if (destination != null) {
        destination.add(unit);

      } else if (property != null) {
        if (properties.containsKey(property.getName())) {
          throw tokens.constructMalformedSyntaxException("Duplicate interface property");
        }
        properties.put(property.getName(), property);
      }
    }

    tokens.require(T_RIGHT_BRACE);

    return STSyntax.addAllAnnotations(
      new STInterfaceBody(position, callSignatures, indexSignature, constructors, properties, methods),
      interfaceAnnotations);
  }

  public List<STInterfaceCallSignature> getCallSignatures () {
    return callSignatures;
  }

  public STInterfaceIndexSignature getIndexSignature () {
    return indexSignature;
  }

  public List<STInterfaceConstructor> getConstructors () {
    return constructors;
  }

  public Map<String, STInterfaceProperty> getProperties () {
    return properties;
  }

  public List<STInterfaceMethod> getMethods () {
    return methods;
  }
}
