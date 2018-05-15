str.expandtabs = (a, tabsize) => {
  tabsize = assert_param("tabsize", tabsize, is_integer_or_boolean, 8);

  if (tabsize < 1) {
    return a;
  }

  let col = 0;
  let res = "";

  for (let i = 0; i < a.length; i++) {
    let c = a[i];

    switch (c) {
    case "\t":
      do {
        res += " ";
        col++;
      } while (col % tabsize);
      break;

    case "\r":
    case "\n":
      col = -1;
      // Fallthrough

    default:
      col++;
      res += c;
    }
  }

  return res;
};
