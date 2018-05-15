str.find = (a, sub, start, end) => {
  sub = assert_param("sub", sub, is_string);
  // $start and $end are NOT rounded to nearest valid index
  start = assert_param("start", start, is_integer_or_boolean, 0);
  end = assert_param("end", end, is_integer_or_boolean, a.length);

  return sub.slice(start, end).indexOf(sub);
};
