package org.ooml.oomlc.core.env.gen.Syntax.Statement;

import org.ooml.oomlc.core.env.gen.Utils.Position;

public abstract class STTypingStatement extends STStatement {
  protected STTypingStatement (Position position, StatementType type) {
    super(position, type);
  }
}
