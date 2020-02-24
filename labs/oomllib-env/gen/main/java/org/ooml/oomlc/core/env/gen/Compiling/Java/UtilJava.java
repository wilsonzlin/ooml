package org.ooml.oomlc.core.env.gen.Compiling.Java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;

public class UtilJava {
  private static final Set<String> RESERVED_JAVA_KEYWORDS = _createReservedJavaKeywordsSet();

  private UtilJava () {
  }

  private static Set<String> _createReservedJavaKeywordsSet () {
    Set<String> set = new HashSet<>();

    set.add("assert");
    set.add("catch");
    set.add("char");
    set.add("continue");
    set.add("default");
    set.add("extends");
    set.add("finally");
    set.add("import");
    set.add("public");
    set.add("this");

    return set;
  }

  public static JavaType wrapType (String wrapper, JavaType wrapped) {
    return new JavaType(wrapper, new JavaType[]{wrapped});
  }

  public static JavaType wrapOptionalType (JavaType nonOptionalType) {
    return wrapType("Optional", nonOptionalType);
  }

  public static <T> T find (List<T> from, Predicate<T> predicate) {
    Optional<T> value = from.stream().filter(predicate).findFirst();
    return value.orElse(null);
  }

  public static <T> T findAndRemove (List<T> from, Predicate<T> predicate) {
    T found = find(from, predicate);
    if (found != null) {
      from.remove(found);
      return found;
    }
    return null;
  }

  public static <T> List<T> listFrom (T... elements) {
    return new ArrayList<>(Arrays.asList(elements));
  }

  public static String safeIdentifier (String identifier) {
    if (RESERVED_JAVA_KEYWORDS.contains(identifier)) {
      return '_' + identifier;
    }
    return identifier;
  }

  public static String safeEnum (String identifier) {
    if (identifier.isEmpty()) {
      return "__NONE";
    }

    if (Character.isDigit(identifier.charAt(0))) {
      identifier = '_' + identifier;
    }
    return identifier.replaceAll("-", "_").toUpperCase();
  }

  public static String capitalise (String str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }
}
