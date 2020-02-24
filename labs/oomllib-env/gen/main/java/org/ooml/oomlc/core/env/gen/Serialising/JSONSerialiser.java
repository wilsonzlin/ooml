package org.ooml.oomlc.core.env.gen.Serialising;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JSONSerialiser {
  private static final Gson gson = new GsonBuilder()
    .setExclusionStrategies(new JSONExclusionStrategy())
    .setPrettyPrinting()
    .create();

  public static String serialise (Object object) {
    return gson.toJson(object);
  }
}
