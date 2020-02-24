str.startswith = (a, prefix, start, end) => {
  let working = a.slice(start, end);
  return working.slice(0, prefix.length) == prefix;
};
