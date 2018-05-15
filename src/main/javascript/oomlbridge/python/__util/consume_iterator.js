let consume_iterator = (it, consumer) => {
  while (true) {
    let next = it.next();
    if (next.done) {
      break;
    }
    consumer(next.value);
  }
};
