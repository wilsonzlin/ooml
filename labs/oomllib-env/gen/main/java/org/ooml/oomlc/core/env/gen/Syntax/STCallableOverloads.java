package org.ooml.oomlc.core.env.gen.Syntax;

import java.util.ArrayList;
import java.util.List;

public class STCallableOverloads {
  private final List<STCallable> signatures = new ArrayList<>();

  public void addSignature (STCallable st_callable) {
    signatures.add(st_callable);
  }

  public List<STCallable> getSignatures () {
    return signatures;
  }
}
