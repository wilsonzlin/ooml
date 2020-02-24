package org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STCallable;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STInterfaceCallSignature extends STInterfaceBodyUnit {
  private final STCallable callable;

  private STInterfaceCallSignature (Position position, STCallable callable) {
    super(position);
    this.callable = callable;
  }

  public static STInterfaceCallSignature parseCallSignature (Tokens tokens) {
    STCallable callable = STCallable.parseCallable(tokens, TokenType.T_COLON);

    return new STInterfaceCallSignature(callable.getPosition(), callable);
  }

  public STCallable getCallable () {
    return callable;
  }
}
