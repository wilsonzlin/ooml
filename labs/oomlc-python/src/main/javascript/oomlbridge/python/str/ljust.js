str.ljust = (a, width, fillchar) => {
  width = assert_param("width", width, is_integer_or_boolean);
  fillchar = assert_param("fillchar", fillchar, is_string, " ");

  assert(fillchar.length == 1, TypeError, "Fill must be one character");

  let len = a.length;

  if (width <= len) {
    return a;
  }

  return a + fillchar.repeat(width - len);
};
