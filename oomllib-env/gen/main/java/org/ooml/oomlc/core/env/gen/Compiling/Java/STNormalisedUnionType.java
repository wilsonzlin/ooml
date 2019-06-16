package org.ooml.oomlc.core.env.gen.Compiling.Java;

import org.ooml.oomlc.core.env.gen.Syntax.Type.STPrimitiveType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STStringLiteralType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STUnionType;

import java.util.ArrayList;
import java.util.List;

public class STNormalisedUnionType {
  private final boolean nullable;
  private final List<STType> subtypes;
  private final List<String> literals;

  private STNormalisedUnionType (boolean nullable, List<STType> subtypes, List<String> literals) {
    this.nullable = nullable;
    this.subtypes = subtypes;
    this.literals = literals;
  }

  public static STNormalisedUnionType from (STUnionType st_union_type) {
    boolean nullable = false;
    List<STType> subtypes = new ArrayList<>();
    List<String> literals = new ArrayList<>();

    for (STType st_subtype : ((STUnionType) st_union_type).getSubtypes()) {
      switch (st_subtype.getTypeType()) {
      case PRIMITIVE:
        switch (((STPrimitiveType) st_subtype).getPrimitive()) {
        case NULL:
        case UNDEFINED:
          nullable = true;
          break;

        default:
          subtypes.add(st_subtype);
        }
        break;

      case STRING_LITERAL:
        literals.add(((STStringLiteralType) st_subtype).getValue());
        break;

      default:
        subtypes.add(st_subtype);
      }
    }

    return new STNormalisedUnionType(nullable, subtypes, literals);
  }

  public boolean isNullable () {
    return nullable;
  }

  public List<STType> getSubtypes () {
    return subtypes;
  }

  public List<String> getLiterals () {
    return literals;
  }
}
