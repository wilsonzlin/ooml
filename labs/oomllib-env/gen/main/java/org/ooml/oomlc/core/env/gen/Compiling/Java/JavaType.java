package org.ooml.oomlc.core.env.gen.Compiling.Java;

import org.ooml.oomlc.core.env.gen.Utils.Util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class JavaType {
  Boolean isNullable; // Can be null (i.e. don't add notation)
  String reference;
  List<JavaType> genericArguments = new ArrayList<>();

  JavaType (String reference) {
    this(null, reference, null);
  }

  JavaType (Boolean isNullable, String reference) {
    this(isNullable, reference, null);
  }

  JavaType (String reference, JavaType[] genericArguments) {
    this(null, reference, genericArguments);
  }

  JavaType (Boolean isNullable, String reference, JavaType[] genericArguments) {
    this.isNullable = isNullable;
    this.reference = reference;
    if (genericArguments != null) {
      Collections.addAll(this.genericArguments, genericArguments);
    }
  }

  @Override
  public String toString () {
    return toString(false);
  }

  public String toString (boolean shouldUseOptional) {
    String syntax = reference;
    if (!genericArguments.isEmpty()) {
      syntax += '<' + Util.join(", ", Util.map(genericArguments, gt -> gt.toString(true))) + '>';
    }

    if (isNullable != null) {
      if (isNullable) {
        if (!shouldUseOptional) {
          syntax = "@Nullable " + syntax;
        } else {
          syntax = "Optional<" + syntax + ">";
        }
      } else {
        if (!shouldUseOptional) {
          syntax = "@NotNull " + syntax;
        }
      }
    }

    return syntax;
  }
}
