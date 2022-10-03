package org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit;

import org.ooml.oomlc.core.env.gen.Parsing.Tokens;
import org.ooml.oomlc.core.env.gen.Syntax.STCallable;
import org.ooml.oomlc.core.env.gen.Syntax.STIdentifier;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import static org.ooml.oomlc.core.env.gen.Parsing.TokenType.T_COLON;

public class STInterfaceMethod extends STInterfaceBodyUnit {
  private final String name;
  private final STCallable callable;

  private STInterfaceMethod (Position position, String name, STCallable callable) {
    super(position);
    this.name = name;
    this.callable = callable;
  }

  public static STInterfaceMethod parseMethod (Tokens tokens) {
    Position position = tokens.peek().getPosition();

    String name = STIdentifier.requireIdentifier(tokens, true);

    STCallable callable = STCallable.parseCallable(tokens, T_COLON);

    return new STInterfaceMethod(position, name, callable);
  }

  public String getName () {
    return name;
  }

  public STCallable getCallable () {
    return callable;
  }
}
