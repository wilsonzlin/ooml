// Create a JS iterator from a JS iterator,
// but handle both throwing StopIteration and returning `.done`
let iter_wrap = it => {
  return {
    next: () => {
      let next;
      try {
        next = it.next();
      } catch (e) {
        if (is_instance(StopIteration, e)) {
          return {
            done: true,
          };
        }
        throw e;
      }

      if (is_pojo(next) && is_boolean(next.done)) {
        return next;

      } else {
        return {
          done: false,
          value: next,
        };
      }
    },
  };
};
