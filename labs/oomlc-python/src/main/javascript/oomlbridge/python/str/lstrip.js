str.lstrip = (a, chars) => {
  let default_chars = "\r\n\t\f\v ";
  // NOTE: This function does not handle Unicode properly in many ways,
  // and so might not match Python
  // The default $chars is not Unicode, and the character getting and slicing
  // does not handle surrogate pairs and grapheme clusters (although most methods don't)
  chars = assert_param("chars", chars, nullable_is(is_string), default_chars);
  if (chars == null) {
    chars = default_chars;
  }

  while (chars.indexOf(a[0])) {
    a = a.slice(1);
  }

  return a;
};
