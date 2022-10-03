package org.ooml.oomlc.core.env.gen.Syntax.Statement;

import org.ooml.oomlc.core.env.gen.Utils.Position;

public abstract class STDataStatement extends STStatement {
  protected STDataStatement (Position position, StatementType type) {
    super(position, type);
  }
}
