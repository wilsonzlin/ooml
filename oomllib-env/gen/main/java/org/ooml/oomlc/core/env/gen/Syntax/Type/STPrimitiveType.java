package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.util.HashMap;
import java.util.Map;

import static org.ooml.oomlc.core.env.gen.Syntax.Type.STPrimitiveType.Primitive.STRING_TO_PRIMITIVE_MAP;

public class STPrimitiveType extends STType {
  private final Primitive primitive;

  private STPrimitiveType (Position position, Primitive primitive) {
    super(position, TypeType.PRIMITIVE);
    this.primitive = primitive;
  }

  public static STPrimitiveType parsePrimitiveType (Tokens tokens) {
    Position position = tokens.peek().getPosition();

    String name = STIdentifier.requireIdentifier(tokens);

    if (!STRING_TO_PRIMITIVE_MAP.containsKey(name)) {
      throw tokens.constructRequiredSyntaxNotFoundException("Required a primitive subtype");
    }

    return new STPrimitiveType(position, STRING_TO_PRIMITIVE_MAP.get(name));
  }

  public Primitive getPrimitive () {
    return primitive;
  }

  public enum Primitive {
    OBJECT, NUMBER, NULL, UNDEFINED, BOOLEAN, STRING;

    public static final Map<String, Primitive> STRING_TO_PRIMITIVE_MAP = _createStringToPrimitiveMap();

    private static Map<String, Primitive> _createStringToPrimitiveMap () {
      Map<String, Primitive> stringPrimitiveMap = new HashMap<>();

      stringPrimitiveMap.put("object", OBJECT);
      stringPrimitiveMap.put("boolean", BOOLEAN);
      stringPrimitiveMap.put("null", NULL);
      stringPrimitiveMap.put("undefined", UNDEFINED);
      stringPrimitiveMap.put("number", NUMBER);
      stringPrimitiveMap.put("string", STRING);

      return stringPrimitiveMap;
    }
  }
}
