package org.ooml.oomlc.core.env.gen.Utils;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class Acceptable<T> {
  private final Set<T> set;

  @SafeVarargs
  public Acceptable (T... t) {
    set = new HashSet<>(Arrays.asList(t));
  }

  public boolean has (T t) {
    return set.contains(t);
  }
}
