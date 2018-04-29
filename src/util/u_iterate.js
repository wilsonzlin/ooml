let u_iterate = (iterable, iterator) => {
  for (let i = 0; i < iterable.length; i++) {
    iterator(iterable[i], i);
  }
};
