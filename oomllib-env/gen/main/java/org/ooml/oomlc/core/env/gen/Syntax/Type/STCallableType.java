package org.ooml.oomlc.core.env.gen.Syntax.Type;

import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STCallable;
import org.ooml.oomlc.core.env.gen.Utils.Position;

public class STCallableType extends STType {
  private final STCallable callable;

  private STCallableType (Position position, STCallable callable) {
    super(position, TypeType.CALLABLE);
    this.callable = callable;
  }

  public static STCallableType parseCallableType (Tokens tokens) {
    Position position = tokens.peek().getPosition();
    STCallable callable = STCallable.parseCallable(tokens, TokenType.T_EQUALS_AND_RIGHT_CHEVRON);

    return new STCallableType(position, callable);
  }

  public STCallable getCallable () {
    return callable;
  }
}
