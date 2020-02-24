package org.ooml.oomlc.core.env.gen.Utils;

import java.util.Collection;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Util {
  public static String join (String joiner, Collection<?> collection) {
    return collection.stream().map(Object::toString).collect(Collectors.joining(joiner));
  }

  public static <T, R> List<R> map (Collection<T> collection, Function<? super T, ? extends R> mapper) {
    return collection.stream().map(mapper).collect(Collectors.toList());
  }

  public static String indent (String code) {
    return code.replaceAll("(?m)^", "\t");
  }
}
