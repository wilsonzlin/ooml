let all_iterator = (it, predicate) => {
  while (true) {
    let next = it.next();
    if (next.done) {
      break;
    }
    if (!predicate(next.value)) {
      return false;
    }
  }
  return true;
};
