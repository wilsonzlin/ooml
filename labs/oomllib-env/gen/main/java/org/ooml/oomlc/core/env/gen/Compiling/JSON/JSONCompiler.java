package org.ooml.oomlc.core.env.gen.Compiling.JSON;

import org.ooml.oomlc.core.env.gen.Serialising.JSONSerialiser;
import org.ooml.oomlc.core.env.gen.Syntax.Namespace.STNamespace;

public class JSONCompiler {
  public static String compile (STNamespace st_namespace) {
    return JSONSerialiser.serialise(st_namespace);
  }
}
