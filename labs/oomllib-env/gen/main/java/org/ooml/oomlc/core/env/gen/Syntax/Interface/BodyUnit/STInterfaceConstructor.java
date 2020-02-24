package org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit;

import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STCallable;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.T_COLON;
import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.T_KEYWORD_NEW;

public class STInterfaceConstructor extends STInterfaceBodyUnit {
  private final STCallable callable;

  private STInterfaceConstructor (Position position, STCallable callable) {
    super(position);
    this.callable = callable;
  }

  public static STInterfaceConstructor parseConstructor (Tokens tokens) {
    Position position = tokens.require(T_KEYWORD_NEW).getPosition();

    STCallable callable = STCallable.parseCallable(tokens, T_COLON);

    return new STInterfaceConstructor(position, callable);
  }

  public STCallable getCallable () {
    return callable;
  }
}
