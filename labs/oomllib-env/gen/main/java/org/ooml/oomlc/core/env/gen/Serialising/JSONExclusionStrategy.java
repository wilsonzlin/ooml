package org.ooml.oomlc.core.env.gen.Serialising;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

public class JSONExclusionStrategy implements ExclusionStrategy {
  @Override
  public boolean shouldSkipField (FieldAttributes f) {
    return f.getAnnotation(JSONExc.class) != null;
  }

  @Override
  public boolean shouldSkipClass (Class<?> clazz) {
    return false;
  }
}
