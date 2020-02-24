list.pop = (seq, i) => {
  if (i !== undefined) {
    assert_index(seq, i);
  } else {
    i = -1;
  }

  return seq.splice(i, 1)[0];
};
