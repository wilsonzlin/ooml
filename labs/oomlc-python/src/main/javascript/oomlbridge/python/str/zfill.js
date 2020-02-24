str.zfill = (a, width) => {
  width = assert_param("width", width, is_integer_or_boolean);

  let len = a.length;

  if (width <= len) {
    return a;
  }

  let sign = a[0];
  if (sign != "+" && sign != "-") {
    sign = "";
  } else {
    a = a.slice(1);
  }

  return sign + "0".repeat(width - len) + a;
};
