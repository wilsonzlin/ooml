str.split = (a, sep, maxsplit) => {
  sep = assert_param("sep", sep, is_string);
  maxsplit = assert_param("maxsplit", maxsplit, is_integer_or_boolean, -1);

  assert(sep.length, ValueError, "Empty separator");
  maxsplit = Math.max(-1, maxsplit);

  if (!maxsplit) {
    return [a];
  }

  let parts = [];
  let last_idx = 0;

  let count = 0;
  while (maxsplit == -1 || count < maxsplit) {
    let idx = a.indexOf(sep, last_idx);
    if (idx == -1) {
      break;
    }
    parts.push(a.slice(last_idx, idx));
    last_idx = idx + sep.length;
    count++;
  }

  if (last_idx < a.length - 1) {
    parts.push(a.slice(last_idx));
  }

  return parts;
};
