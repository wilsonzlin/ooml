str.index = (a, sub, start, end) => {
  let idx = str.find(a, sub, start, end);
  assert(idx > -1, ValueError, "Substring not found");
  return idx;
};
