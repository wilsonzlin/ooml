str.rindex = (a, sub, start, end) => {
  let idx = str.rfind(a, sub, start, end);
  assert(idx > -1, ValueError, "Substring not found");
  return idx;
};
