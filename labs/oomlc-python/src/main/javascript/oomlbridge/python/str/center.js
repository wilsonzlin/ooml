str.center = (a, width, fillchar) => {
  width = assert_param("width", width, is_integer_or_boolean);
  fillchar = assert_param("fillchar", fillchar, is_string, " ");

  assert(fillchar.length == 1, TypeError, "Fill must be one character");

  let len = a.length;

  if (width <= len) {
    return a;
  }

  let left = Math.floor((width - len) / 2);
  let right = width - len - left;

  return fillchar.repeat(left) + a + fillchar.repeat(right);
};
