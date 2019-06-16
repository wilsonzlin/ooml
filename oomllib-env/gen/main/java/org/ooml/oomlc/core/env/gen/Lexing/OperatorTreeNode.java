package org.ooml.oomlc.core.env.gen.Lexing;


import org.ooml.oomlc.core.env.gen.Parsing.TokenType;
import org.ooml.oomlc.core.env.gen.Utils.MatcherTreeNode;

public class OperatorTreeNode extends MatcherTreeNode<Character, TokenType> {
  public void addSequence (char[] raw_sequence, int start, TokenType result) {
    Character[] sequence = new Character[raw_sequence.length];
    for (int i = 0; i < sequence.length; i++) {
      sequence[i] = raw_sequence[i];
    }
    super.addSequence(sequence, start, result);
  }
}
