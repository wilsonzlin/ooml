str.rsplit = (a, sep, maxsplit) => {
  sep = assert_param("sep", sep, is_string);
  maxsplit = assert_param("maxsplit", maxsplit, is_integer_or_boolean, -1);

  assert(sep.length, ValueError, "Empty separator");
  maxsplit = Math.max(-1, maxsplit);

  if (!maxsplit) {
    return [a];
  }

  let parts = [];
  let last_idx = a.length - 1;

  let count = 0;
  while (maxsplit == -1 || count < maxsplit) {
    let idx = a.slice(0, last_idx + 1).lastIndexOf(sep);
    if (idx == -1) {
      break;
    }
    parts.unshift(a.slice(idx + 1, last_idx + 1));
    last_idx = idx - sep.length;
    count++;
  }

  if (last_idx > 0) {
    parts.unshift(a.slice(0, last_idx + 1));
  }

  return parts;
};

/*
 *
 * Key:
 *
 *   ]  = last index
 *   ^  = found index
 *   () = slice range (more than one char.)
 *   O  = slice range (single char.)
 *
 * a,b,c,def,g
 *           ]
 *          ^
 *           O
 *         ]
 *      ^
 *       ( )
 *     ]
 *
 */
