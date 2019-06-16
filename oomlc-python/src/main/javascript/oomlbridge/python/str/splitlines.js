str.splitlines = (a, keepends) => {
  keepends = assert_param("keepends", keepends, is_boolean, false);

  let regex = /(.*?)(\r\n|[\r\n\v\f\x1c\x1d\x1e\x85\u2028\u2029])/g;

  let parts = [];

  let last_idx = 0;
  let match;

  while (match = regex.exec(a)) {
    let line = match[1];
    if (keepends) {
      line += match[2];
    }
    parts.push(line);
    last_idx = match.index + match[0].length;
  }

  if (last_idx < a.length) {
    parts.push(a.slice(last_idx));
  }

  return parts;
};
