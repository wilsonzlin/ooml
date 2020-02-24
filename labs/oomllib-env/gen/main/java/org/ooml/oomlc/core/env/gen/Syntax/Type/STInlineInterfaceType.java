package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.STInterfaceBody;

public class STInlineInterfaceType extends STType {
  private final STInterfaceBody intface;

  private STInlineInterfaceType (STInterfaceBody intface) {
    super(intface.getPosition(), TypeType.INLINE_INTERFACE);
    this.intface = intface;
  }

  public static STInlineInterfaceType parseInlineInterfaceType (Tokens tokens) {
    return new STInlineInterfaceType(STInterfaceBody.parseInterfaceBody(tokens));
  }

  public STInterfaceBody getInterfaceBody () {
    return intface;
  }
}
