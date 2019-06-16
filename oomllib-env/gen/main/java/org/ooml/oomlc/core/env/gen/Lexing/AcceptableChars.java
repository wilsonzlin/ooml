package org.ooml.oomlc.core.env.gen.Lexing;

import org.ooml.oomlc.core.env.gen.Utils.Acceptable;

public class AcceptableChars extends Acceptable<Character> {
  public AcceptableChars (String chars) {
    super(toCharacterArray(chars));
  }

  public AcceptableChars (Character... chars) {
    super(chars);
  }

  private static Character[] toCharacterArray (String chars) {
    char[] charArray = chars.toCharArray();
    Character[] characterArray = new Character[charArray.length];
    for (int i = 0; i < charArray.length; i++) {
      characterArray[i] = charArray[i];
    }
    return characterArray;
  }
}
