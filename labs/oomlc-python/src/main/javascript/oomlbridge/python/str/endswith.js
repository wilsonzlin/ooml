str.endswith = (a, suffix, start, end) => {
  let working = a.slice(start, end);
  return working.slice(-suffix.length) == suffix;
};
