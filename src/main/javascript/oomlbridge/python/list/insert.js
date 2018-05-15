list.insert = (seq, i, x) => {
  // If $i is out of bounds (i.e. 0 <= i <= seq.length),
  // Python simply chooses the nearest valid integer
  // (i.e. -4 -> 0, seq.length + 5000 -> seq.length)
  seq.splice(nearest_index(seq, i), 0, x);
  return null;
};
