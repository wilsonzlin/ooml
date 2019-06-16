package org.ooml.oomlc.core.env.gen.Utils;

public interface Matchable<M> {
  M matcherConsume ();

  void matcherReverse ();
}
