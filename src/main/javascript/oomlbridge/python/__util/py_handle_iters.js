// Iterates over a JS iterator using a callback
// Iteration can be stopped
let py_handle_iter = (iterator, handler) => {
  while (true) {
    let next = iterator.next();

    if (next.done) {
      break;
    }

    let res = handler(next.value);

    if (res === py_handle_iters_stop) {
      break;
    }
  }
};

let py_handle_iters_stop = {};
