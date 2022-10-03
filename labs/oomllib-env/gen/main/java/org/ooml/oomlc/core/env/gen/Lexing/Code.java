package org.ooml.oomlc.core.env.gen.Lexing;

import org.ooml.oomlc.core.env.gen.Exception.MalformedSyntaxException;
import org.ooml.oomlc.core.env.gen.Exception.UnexpectedEndOfCodeException;
import org.ooml.oomlc.core.env.gen.Utils.Matchable;
import org.ooml.oomlc.core.env.gen.Utils.Position;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.NoSuchElementException;

public class Code implements Matchable<Character> {

  private static final int MAX_HISTORICAL_BUFFER_SIZE = 1024;

  private final BufferedReader inputStream;
  /*
   *
   *          CONSUMED | UPCOMING
   *   <lastReadChars> | <returnBuffer> <inputStream>
   *
   */
  private final Deque<Character> returnBuffer = new ArrayDeque<>();
  // Keep a maximum of MAX_HISTORICAL_BUFFER_SIZE last characters
  // (i.e. can only call `backUp` sequentially at most 10 times)
  private final Deque<Character> lastReadChars = new ArrayDeque<>(MAX_HISTORICAL_BUFFER_SIZE);
  private int currentLineNo = 1;
  private int currentColNo = 0;

  public Code (InputStream inputStream) {
    this.inputStream = new BufferedReader(new InputStreamReader(inputStream));
  }

  private Character _readCharFromStream () {
    int nextCharAsInt;

    try {
      nextCharAsInt = inputStream.read();
    } catch (IOException e) {
      return null;
    }

    if (nextCharAsInt == -1) {
      return null;
    }

    return (char) nextCharAsInt;
  }

  private char readChar () {
    while (lastReadChars.size() > MAX_HISTORICAL_BUFFER_SIZE) {
      lastReadChars.removeFirst();
    }

    char nextChar;

    try {
      nextChar = returnBuffer.removeFirst();
    } catch (NoSuchElementException nsee) {
      Character nextCharFromStream = _readCharFromStream();
      if (nextCharFromStream == null) {
        throw new UnexpectedEndOfCodeException();
      }

      if (nextCharFromStream == '\r') {
        Character nextNextCharFromStream = _readCharFromStream();
        if (nextNextCharFromStream != null) {
          if (nextNextCharFromStream == '\n') {
            nextCharFromStream = '\n';
          } else {
            returnBuffer.addFirst(nextNextCharFromStream);
          }
        }
      }

      nextChar = nextCharFromStream;
    }

    if (nextChar == '\n') {
      currentLineNo++;
      currentColNo = 0;
    } else {
      currentColNo++;
    }

    lastReadChars.addLast(nextChar);

    return nextChar;
  }

  public Position getCurrentPosition () {
    return new Position(currentLineNo, currentColNo);
  }

  public void backUp () {
    char ret = lastReadChars.removeLast();
    switch (ret) {
    case '\n':
      currentLineNo--;
      currentColNo = -1;
      break;

    default:
      currentColNo--;
    }
    returnBuffer.addFirst(ret);
  }

  public String acceptOptional (char c) {
    char next = accept();
    if (c != next) {
      backUp();
      return "";
    }
    return "" + next;
  }

  public String acceptOptional (AcceptableChars chars) {
    char next = accept();
    if (!chars.has(next)) {
      backUp();
      return "";
    }
    return "" + next;
  }

  public String acceptGreedy (AcceptableChars chars) {
    StringBuilder res = new StringBuilder();
    while (true) {
      char next = accept();
      if (!chars.has(next)) {
        backUp();
        break;
      }
      res.append(next);
    }
    return res.toString();
  }

  public String acceptUntil (char c) {
    StringBuilder res = new StringBuilder();
    while (true) {
      char next = accept();
      if (c == next) {
        backUp();
        break;
      }
      res.append(next);
    }
    return res.toString();
  }

  public String acceptUntil (AcceptableChars chars) {
    StringBuilder res = new StringBuilder();
    while (true) {
      char next = accept();
      if (chars.has(next)) {
        backUp();
        break;
      }
      res.append(next);
    }
    return res.toString();
  }

  public void skipGreedyBeforeEnd (AcceptableChars chars) {
    while (true) {
      char next = accept();
      if (!chars.has(next)) {
        backUp();
        break;
      }
    }
  }

  public void skipUntil (char c) {
    while (true) {
      char next = accept();
      if (c == next) {
        backUp();
        break;
      }
    }
  }

  public void skipUntil (AcceptableChars c) {
    while (true) {
      char next = accept();
      if (c.has(next)) {
        backUp();
        break;
      }
    }
  }

  public char accept () {
    return readChar();
  }

  public void skip () {
    readChar();
  }

  public void skip (int count) {
    for (int i = 0; i < count; i++) {
      skip();
    }
  }

  public boolean skipIfNext (char c) {
    char nextChar = readChar();
    if (nextChar == c) {
      return true;
    } else {
      backUp();
      return false;
    }
  }

  public char peek () {
    char nextChar = readChar();
    backUp();
    return nextChar;
  }

  public char peek (int offset) {
    if (offset < 1) {
      throw new IllegalArgumentException("Invalid offset");
    }

    char nextChar = 0;
    for (int i = 0; i < offset; i++) {
      nextChar = readChar();
    }
    for (int i = 0; i < offset; i++) {
      backUp();
    }

    return nextChar;
  }

  public MalformedSyntaxException constructMalformedSyntaxException (String message) {
    Position pos = getCurrentPosition();

    return new MalformedSyntaxException(message, pos);
  }

  @Override
  public Character matcherConsume () {
    return accept();
  }

  @Override
  public void matcherReverse () {
    backUp();
  }

}
